import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrderListProvider} from "../../providers/order-list/order-list";
import {UserData} from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  // var for stepers
  mode: string = 'vertical';
  selectedIndex = 2;
  orderListId ;
  // user id for all last orders
  userid: number;

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
      res => {
        this.userid = res;
        this.orderListPro.getOrderListById(this.userid).subscribe(
          res2 => {
            console.log(res2);
          }
        );

      }
    );
  }
  checkOrderStatus(){
    // check premmsion for user before make the call
    console.log(this.orderListId);
    this.orderListPro.getOrderListById(this.orderListId).subscribe(orderList => {
      console.log(orderList)
      if(orderList.status == "I") {
        // change to zero - incoming
        this.selectedIndex = 0;
      }else if(orderList.status == "A"){
        // change to one - active
        this.selectedIndex = 1;
      }else {
        // change to two - complete
        this.selectedIndex = 2;
      }
    });
  }

}
