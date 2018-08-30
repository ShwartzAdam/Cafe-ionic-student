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
  public callback: any;
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
    this.callback = this.navParams.get("callback");
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
          // display all items for reviews
        } else {
          for(let index = 0 ; index < len ; index++ ){
            let removeItem = res[index]['itemid'];
            this.items = this.items.filter(item => item.itemid !== removeItem);
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

    if(this.comment[index] == '' || this.stars[index] == -1) {
    } else{
      // create review entity for post call
      this.review.comment = this.comment[index];
      this.review.stars = this.stars[index];
      this.review.userid = this.userid;
      // create review list for post call
      this.reviewList.itemid =  item.itemid;
      this.revListPro.getReviewListForItem(item.itemid).then(
        res => {
          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Please Wait...'
          });
          loading.present();
          setTimeout(() => {
            loading.dismiss();
          }, 5000);
          if( res['rlid'] == -1) {
            // there is no review list for this item
            this.revListPro.createReviewList(this.reviewList).then(
              res => {
                this.review.rlid = res['rlid'];
                this.revPro.createReview(this.review).then(
                  res => {
                    this.removeItemFromForm(item);
                    this.review = new Review();
                  }).catch(err => {console.log(err)})
              })
          } else {
            this.review.rlid = res['rlid'];
            this.revPro.createReview(this.review).then(
              res => {
                this.removeItemFromForm(item);
                this.review = new Review();
              }).catch(err => {})
          }
        });

    }

  }
  private removeItemFromForm(_item): any {
    this.items = this.items.filter(item => item.itemid !== _item.itemid);
    if( this.items.length == 0 ) {
      // api call to changed has review to True
      this.orderListPro.getOrderListByOlid(this.orderListId).subscribe(
        res => {
            this.orderList = res;
            this.orderList.hasreview = true;
            this.orderListPro.updateOrderList(this.orderList).then(
              res => {
                let loading = this.loadingCtrl.create({
                  spinner: 'crescent',
                  content: 'Please Wait...'
                });
                loading.present();
                setTimeout(() => {
                  this.callback(true).then(()=>{
                    this.navCtrl.pop();
                  });
                  });

                setTimeout(() => {
                  loading.dismiss();
                }, 2000);

              });
        });
    }

  }

}
