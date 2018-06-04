import { Component } from '@angular/core';
import {NavParams, NavController, LoadingController} from "ionic-angular";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../../pages/basket/basket";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../model/order";
import {Item} from "../../model/item";
import {Review} from "../../model/review";
import {ReviewList} from "../../model/reviewList";
import {ItemProvider} from "../../providers/item/item";
import {ReviewListProvider} from "../../providers/review-list/review-list";
import {ReviewProvider} from "../../providers/review/review";
import {OrderList} from "../../model/orderList";

@Component({
  selector: 'review',
  templateUrl: 'review.html'
})
export class ReviewComponent {

  private orderListId: number;
  private orderList: OrderList = new OrderList;
  private orders: Order[] = new Array();
  private items: Item[] = new Array();
  private review: Review = new Review();
  private reviewList: ReviewList = new ReviewList();
  private userid: number;
  public comment: string[] = new Array();
  public stars: number[] = new Array();
  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public userData: UserData,
              public orderListPro: OrderListProvider,
              public orderPro: OrderProvider,
              public itemPro: ItemProvider,
              public revListPro: ReviewListProvider,
              public revPro: ReviewProvider,
              public loadingCtrl: LoadingController) {
    this.orderListId = this.navParams.get('orderListIdRev');
    this.initView();
  }
  initView(): any {
    // get user id
    this.userData.getUserId().then(res => this.userid = res);
    // get all orders by orderlist id
    this.orderPro.getOrdersByOrderListId(this.orderListId).then( (res: any) => {
      // loop on the orders and push to array
      res.forEach(order => {
        //let review: ReviewList = new ReviewList;
        // store item id in RL and push to RL array
        // review.itemid = order.itemid;
        // this.reviewList.push(review);
        // set comment and stars array
        let com: string = '';
        let num: number = -1;
        this.comment.push(com);
        this.stars.push(num);
        this.orders.push(order);
        // get items by itemid and push to array
        this.itemPro.getItemById(order.itemid).subscribe(
          res => {this.items.push(res)}
        )
      });
      this.deleteTrueReview();
    });
  }
  private deleteTrueReview() {
    this.revListPro.getItemRevUser(this.userid,this.orderListId).then(
      res => {
        console.log(res['length']);
        const len = res['length'];
        if( len == 0){
          console.log('No done reviews at all in this order');
          // display all items for reviews
        } else {
          console.log('There is an open review to finish');
          for(let index = 0 ; index < len ; index++ ){
            console.log('need to remove item id ' + res[index]['itemid']);
            let removeItem = res[index]['itemid'];
            this.items = this.items.filter(item => item.itemid !== removeItem);
            console.log(this.items);
          }

        }
      });
  }
  protected adjustTextarea(event: any): void {
    let textarea: any		= event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height 	= 'auto';
    textarea.style.height 	= textarea.scrollHeight + 'px';
    return;
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

  public sendReview(item,index){
    console.log(item);
    console.log(index);
    if(this.comment[index] == '' || this.stars[index] == -1) {
      console.log("no comment or stars were choose");
    } else{
      console.log(this.comment[index]);
      console.log(this.stars[index]);
      console.log(this.review);
      // create review entity for post call
      this.review.comment = this.comment[index];
      this.review.stars = this.stars[index];
      this.review.userid = this.userid;
      // create review list for post call
      this.reviewList.itemid =  item.itemid;
      console.log(this.reviewList);
      this.revListPro.createReviewList(this.reviewList).then(
        res =>  {
          // review list id
          console.log(res);
          this.review.rlid = res['rlid'];
          console.log(this.review.rlid);
          this.revPro.createReview(this.review).then(
            res => {
                console.log("created succesfuly new review with id ..")
                console.log(res);
                this.removeItemFromForm(item);
                this.review = new Review();
            });
        }
      )
    }

  }
  private removeItemFromForm(_item): any {
    this.items = this.items.filter(item => item.itemid !== _item.itemid);
    console.log(this.items);
    if( this.items.length == 0 ) {
      console.log('no more items for reviews');
      // api call to changed has review to True
      this.orderListPro.getOrderListByOlid(this.orderListId).subscribe(
        res => {
            console.log(res);
            this.orderList = res;
            this.orderList.hasreview = true;
            this.orderListPro.updateOrderList(this.orderList).then(
              res => {
                console.log(res);
                let loading = this.loadingCtrl.create({
                  spinner: 'crescent',
                  content: 'Please Wait...'
                });
                loading.present();
                setTimeout(() => {
                  this.navCtrl.setRoot("TrackingPage");
                }, 1000);

                setTimeout(() => {
                  loading.dismiss();
                }, 2000);

              });
        });
    } else{
      console.log('there are still items to review');
    }

  }

}
