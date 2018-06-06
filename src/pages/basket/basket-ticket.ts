import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {Item} from "../../model/item";
import {UserData} from "../../providers/user-data/user-data";
import {OrderProvider} from "../../providers/order/order";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {OrderList} from "../../model/orderList";
import {Order} from "../../model/order";

import * as moment from 'moment';

@Component({
  selector: 'page-basket-ticket',
  templateUrl: 'basket-ticket.html'
})
export class BasketTicket {
  private orderList: OrderList = null;
  private order: Order[] = new Array();
  items: Item[] = new Array();
  orderTime: any;
  orderTimeExtended: any;
  totalPrice: number;
  // hide asked time
  displayTime: boolean = false;
  displayButtons: boolean = false;
  displaySuccessTime: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public orderPro: OrderProvider,
              public orderLPro: OrderListProvider,
              public events: Events) {
        this.items = this.navParams.get("orderList");
        this.initView();
  }
  initView(): any {
    this.totalPrice = 0;
    this.items.forEach(item => {
      this.totalPrice = ((this.totalPrice) + Math.imul(item.qty,item.price));
    });
  }
  checkTime(): any {
    // if time is good ->
    //      display button , create orderlist with status None
    //  else time is not good ->
    //         dont show button, dont create order list yet
    this.displayTime = true;
    this.displayButtons = true;
    this.displaySuccessTime = true;
    // collect order time
    console.log(this.orderTime);
    const orderTime = moment(new Date().getTime(),'hh:mm:ss').add(3,'h').toISOString();
    const pickUpTime = moment(this.orderTime,'hh:mm:ss').add(3,'h').toISOString();
    console.log(orderTime);
    console.log(pickUpTime);
    this.orderTime = orderTime;
    this.orderTimeExtended = pickUpTime;
    // if true and time slot are available
    this.userData.getUserId().then(
      userid => {
        console.log("user id = " + userid);
        let ol: OrderList = new OrderList;
        ol.userid = userid;
        ol.totalprice = this.totalPrice;
        ol.ol_dttm_real = this.orderTimeExtended;
        ol.ol_dttm = this.orderTime;
        ol.totalpreptime = 10;
        ol.status = "None";
        this.orderList = ol;
        console.log(this.orderList);
        this.createOrder();
      });

  }
  createOrder(): any {
    this.orderLPro.createOrderList(this.orderList).then(
      resOrderListId => {
          console.log(resOrderListId);
          this.orderList.olid = resOrderListId["olid"];
          this.items.forEach( item => {
              let ord: Order = new Order;
              ord.itemid = item.itemid;
              ord.qty = item.qty;
              ord.olid = this.orderList.olid;
              this.orderPro.createOrder(ord).then(resOrderListId => {
                  console.log(resOrderListId);
                  ord.orderid = resOrderListId["orderid"];
                  this.order.push(ord);
                  console.log(ord);
              });
          });
          console.log(this.order);
          console.log(this.orderList);
      });
  }

  placeOrder(): any {
    this.userData.cleanCart().then(
      res => console.log(res)
    );
    this.orderList.status = "Incoming";
    this.orderLPro.updateOrderList(this.orderList).then(
      res => {
        console.log(res);
        this.navCtrl.setRoot("TrackingPage");
      }
    );
  }

  clearOrder(): any {
    // return back to 'Checkout Page'
    this.navCtrl.pop();
  }
}
