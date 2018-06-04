import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrderListProvider} from "../../providers/order-list/order-list";
import {UserData} from "../../providers/user-data/user-data";
import {OrderList} from "../../model/orderList";
import {BasketPage} from "../basket/basket";
import {ReviewComponent} from "../../components/review/review";


@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  // var for stepers
  mode: string = 'vertical';
  selectedIndex = 2;
  // order list for review
  private orderListRev : number;
  // list of last five student orders
  private orderListUser: OrderList[] = new Array();
  // user id for all last orders
  private userid: number;
  private countItems: number;
  private displayReviewButton: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderListPro: OrderListProvider,
              public userData: UserData){
    // if the user getting here after quick order
    // present the last orders list for this user with id and status
    this.displayOrderList();
  }

  selectChange(e) {
    console.log(e);
  }

  displayOrderList(){
    this.userData.getUserId().then(
      userRes => {
        // return the student id from storage and set it to get all his orders
        console.log(userRes);
        this.userid = userRes;
        this.userData.getItemsFromCart().then(
          res => {
            if(res){
              this.countItems = res.length;
            }
          }
        );
        this.orderListPro.getOrderListByUserId(this.userid).subscribe(
          ollistRes => {
            let data = ollistRes.filter(orderlist => (orderlist.status == "Incoming" ||
                                                           orderlist.status == "Active" ||
                                                           orderlist.status == "Complete"
            ));
            data.forEach( order => {
              let ol: OrderList = new OrderList;
              ol.olid = order.olid;
              ol.status = order.status;
              ol.totalprice = order.totalprice;
              ol.ol_dttm = order.ol_dttm;
              this.orderListUser.push(ol);
            });
            console.log(this.orderListUser);
          }
        );
      }
    );
  }
  public getOrderStatus(e) {
    this.checkOrderStatus(e);
  }
  checkOrderStatus(orderListId){
    console.log("Order List - " + orderListId);
    // check premmsion for user before make the call
    this.orderListPro.getOrderListByOlid(orderListId).subscribe((orderList: OrderList) => {
      console.log(orderList.status);
      if(orderList.status === "Incoming") {
        // change to zero - incoming
        this.selectedIndex = 0;
        this.displayReviewButton = false;
      }else if(orderList.status === "Active"){
        // change to one - active
        this.selectedIndex = 1;
        this.displayReviewButton = false;
      }else {
        // change to two - complete
        this.displayReviewButton = false;
        this.selectedIndex = 2;
        this.openBoxReview(orderListId);
      }
    });
  }
  private openBoxReview(orderListId: any) {
    this.orderListPro.getOrderListByOlid(orderListId).subscribe(
      res => {
          if(res['hasreview'] == false){
            this.orderListRev = orderListId;
            this.displayReviewButton = true;
          } else {
            console.log('this orderlist has reviews');
          }
      });

  }
  public openReviewPage(orderListId){
    this.navCtrl.push(ReviewComponent,{
      orderListIdRev: orderListId
    })
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }



}
