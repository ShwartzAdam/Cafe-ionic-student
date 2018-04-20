import {Component, OnInit} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import {OrderList} from "../../model/orderList";
import {Order} from "../../model/order";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {UserData} from "../../providers/user-data/user-data";
import {Student} from "../../model/user";
import {UserProvider} from "../../providers/user/user";
import {OrderProvider} from "../../providers/order/order";

import * as moment from 'moment';
import * as tz from 'moment-timezone';

@Component({
  selector: 'quick-order-ticket',
  templateUrl: 'quick-order-ticket.html',
})
export class QuickOrderTicket implements OnInit{

  today: any;
  totalPrice: number;
  drink : string;
  drinkid: number;
  corsid: number;
  crooisant : string;
  myDate : string;
  qDrink : number;
  qCross : number;
  //
  orderlist: OrderList = new OrderList;
  orderFood: Order = new Order ;
  orderDrink: Order = new Order;
  student: Student = new Student;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderListProvider: OrderListProvider,
              public orderProvider: OrderProvider,
              public userData: UserData,
              public userPro: UserProvider){}

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.drinkid = this.navParams.get("drinkid");
    this.corsid = this.navParams.get("crosid");
    this.totalPrice = this.navParams.get("price");
    this.drink = this.navParams.get("drink");
    this.crooisant = this.navParams.get("cross");
    this.myDate = this.navParams.get("time");
    this.qDrink = this.navParams.get("qDrink");
    this.qCross = this.navParams.get("qCross");
    // get Student Details
    this.userData.getUserId().then(
      res => {
        console.log(res);
        this.userPro.getUserById(res).subscribe(
          stu => {
            this.student = stu;
            console.log(this.student);
            this.createOrderList();
          });
      }
    );

  }
  createOrderList() {
    // create Order List
    this.orderlist.userid = this.student.userid;
    console.log( this.orderlist.userid);
    this.orderlist.status = "None";
    let timeOrder = moment(this.myDate,'hh:mm:ss');
    console.log(timeOrder);
    this.orderlist.ol_dttm = timeOrder['_d'];
    console.log(this.orderlist.ol_dttm);

    this.orderlist.totalprice = this.totalPrice;
    console.log(this.orderlist);
    this.orderListProvider.createOrderList(this.orderlist).then(
      (result) => {
        console.log(result);
        this.orderlist.olid = result["olid"];
        // creating food order
        this.orderFood.itemid = this.corsid;
        this.orderFood.qty = this.qCross;
        this.orderFood.olid = this.orderlist.olid;
        // creating drink order
        this.orderDrink.itemid = this.drinkid;
        this.orderDrink.qty = this.qDrink;
        this.orderDrink.olid = this.orderlist.olid;

        this.orderProvider.createOrder(this.orderFood).then(
          res => {
            this.orderFood.orderid = res["orderid"];
            console.log(res);
          }
        );
        this.orderProvider.createOrder(this.orderDrink).then(
          res2 => {
            this.orderDrink.orderid = res2["orderid"];
            console.log(res2)
          }
        );
      }, (err) => {
        console.log(err);
      }
    );


  }

  deleOrder(){
    // delete orderlist id from server and also orderd item
    this.orderListProvider.deleteOrderlistById(this.orderlist.olid).then(
      res => {
        console.log(res);
        this.navCtrl.pop();
      });


  }

  confOrder(){
      this.userData.cleanCart();
      this.orderlist.status = "Incoming";
      this.orderListProvider.updateOrderList(this.orderlist).then(
        res => {
          console.log(res);
          this.navCtrl.setRoot("TrackingPage");
        }
      );

  }


}
