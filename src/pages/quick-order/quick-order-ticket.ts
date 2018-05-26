import {Component, OnInit} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import {OrderList} from "../../model/orderList";
import {Order} from "../../model/order";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {UserData} from "../../providers/user-data/user-data";
import {OrderProvider} from "../../providers/order/order";

import * as moment from 'moment';
import * as tz from 'moment-timezone';
import {Item} from "../../model/item";
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";

@Component({
  selector: 'quick-order-ticket',
  templateUrl: 'quick-order-ticket.html',
})
export class QuickOrderTicket implements OnInit{

  private userid: number;
  private items: Item[] = new Array();
  private orderList: OrderList = new OrderList;
  private order: Order[] = new Array();
  private student: Student = new Student;
  //
  orderTime: any;
  orderTimeExtended: any;
  displayTime: boolean = false;
  displayButtons: boolean = false;
  displaySuccessTime: boolean = false;
  totalPrice: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderLPro: OrderListProvider,
              public orderPro: OrderProvider,
              public userData: UserData,
              public userPro: UserProvider){}

  ngOnInit(): void {
    this.items = this.navParams.get("items");
    console.log(this.items);
    this.userData.getUserId().then(
      _userid => {
          this.userid = _userid;
          this.userPro.getUserById(_userid).subscribe(
            _stu => {
              let stu: Student = new Student;
              stu.userid = _userid;
              stu.firstname = _stu.firstname;
              stu.lastname = _stu.lastname;
              stu.phone = _stu.phone;
              stu.credit = _stu.credit;
              this.student = stu;
            }
          )
      });
    this.initView();
  }

  initView(): void{
    this.totalPrice = 10;
    console.log(this.totalPrice);
    this.items.forEach(item => {
      this.totalPrice = ((this.totalPrice) + Math.imul(item.qty,item.price));
      console.log(this.totalPrice);
    });
  }
  checkTime(){
    // if time is good
    // create connect orderlist to order , add the avaiable time
    // else
    //    ask for differet time
    // orderTime
    //
    this.displayTime = true;
    this.displayButtons = true;
    this.displaySuccessTime = true;
    // collect order time
    console.log(this.orderTime);
    let time = moment(this.orderTime,'hh:mm:ss');
    console.log(time);
    this.orderTimeExtended = time['_d'];
    console.log(this.orderTimeExtended);
    // if true and time slot are available
    this.userData.getUserId().then(
      userid => {
        console.log("user id = " + userid);
        let ol: OrderList = new OrderList;
        ol.userid = userid;
        ol.totalprice = this.totalPrice;
        ol.ol_dttm = this.orderTimeExtended;
        ol.status = "None";
        this.orderList = ol;
        console.log(this.orderList);
        this.createOrder();
      });

  }
  createOrder() {
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

  placeOrder(){
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
