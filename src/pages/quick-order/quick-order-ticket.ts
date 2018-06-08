import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {OrderList} from "../../model/orderList";
import {Order} from "../../model/order";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {UserData} from "../../providers/user-data/user-data";
import {OrderProvider} from "../../providers/order/order";
import {Item} from "../../model/item";
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";
import {ItemProvider} from "../../providers/item/item";

import * as moment from 'moment';


@Component({
  selector: 'quick-order-ticket',
  templateUrl: 'quick-order-ticket.html',
})
export class QuickOrderTicket implements OnInit{

  //new vars
  private orderList = new OrderList();
  private order = new Order();
  private items: Item[] = new Array();
  private student: Student = new Student;
  private prepTotal: number = 0;
  // enable buttons
  public isenabled: boolean = false;
  public pickUpTime: any;
  public orderTime: any;
  public orderTimeExtended: any;
  public length : number;
  displayTime: boolean = false;
  displayButtons: boolean = true;
  displaySuccessTime: boolean = false;
  totalPrice: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderLPro: OrderListProvider,
              public orderPro: OrderProvider,
              public userData: UserData,
              public userPro: UserProvider,
              public itemPro: ItemProvider,
              public loadingCtrl: LoadingController){
  }

  ngOnInit(): void {
    this.orderList = this.navParams.get('orderListParam');
    this.order = this.navParams.get('orderParam');
    this.length = this.navParams.get('size');

    this.totalPrice = this.orderList.totalprice;
    console.log(this.orderList);
    console.log(this.order);

    this.userPro.getUserById(this.orderList.userid).subscribe(
      _stu => {
        let stu: Student = new Student;
        stu.userid = this.orderList.userid;
        stu.firstname = _stu.firstname;
        stu.lastname = _stu.lastname;
        stu.phone = _stu.phone;
        stu.credit = _stu.credit;
        this.student = stu;
      });
    // loop on orders for items
    if(this.length == 1){
      console.log('one item to checkout');
      this.itemPro.getItemById(this.order.itemid).subscribe(
        res => {
          console.log(res);
          let item: Item = new Item;
          item.qty = this.order.qty;
          item.name = res.name;
          item.price = res.price;
          this.items.push(item);
        });

    } else {
      console.log('two or more item to checkout');
      for (let i = 0 ; i < this.length ; i++) {
        this.itemPro.getItemById(this.order[i].itemid).subscribe(
          res => {
            console.log(res);
            let item: Item = new Item;
            item.qty = this.order[i].qty;
            item.name = res.name;
            item.price = res.price;
            this.items.push(item);
          });
      }

    }
   console.log(this.items);


  }

  checkTime(){
    this.isenabled = true;
    //this.displayButtons = true;
    this.displaySuccessTime = true;
    // collect order time
    let orderTimeStr = moment(new Date().getTime(),'hh:mm:ss').add(3,'h').toISOString();
    let pickUpTimeStr = moment(this.orderTime,'hh:mm:ss').add(3,'h').toISOString();
    this.orderTime = pickUpTimeStr;
    this.pickUpTime = pickUpTimeStr;
    this.orderTimeExtended = orderTimeStr;
    this.orderList.ol_dttm_real = this.orderTimeExtended;
    this.orderList.ol_dttm = this.orderTime;
    // set orderlist status to none
    this.orderList.status = 'None';
    // get item for prep time
    if ( this.length == 1){
      this.itemPro.getItemById(this.order.itemid).subscribe(
        res => {
          let timePrepItem = res.preptime;
          let quantity = this.order.qty;
          let prep: number = Math.imul(timePrepItem, quantity);
          this.prepTotal = prep;
          console.log(this.prepTotal);
        });
    } else {
      for ( let i = 0 ; i < this.length ; i++) {
        this.itemPro.getItemById(this.order[i].itemid).subscribe(
          res => {
            let timePrepItem = res.preptime;
            let quantity = this.order[i].qty;
            let prep: number = Math.imul(timePrepItem, quantity);
            this.prepTotal = this.prepTotal + prep;
            console.log(this.prepTotal);
          });
      }
    }

    this.orderList.totalpreptime = this.prepTotal;
    console.log(this.orderList.totalpreptime);
    console.log(this.orderList);
    this.createOrder();
  }

  createOrder() {
    // if order is size of one
    // then do this
    // else create to order
    this.orderLPro.createOrderList(this.orderList).then(
      resOrderListId => {
        console.log(resOrderListId);
        this.orderList.olid = resOrderListId["olid"];
        if ( this.length == 1) {
          // if order is size of one
          this.order.olid = this.orderList.olid;
          this.orderPro.createOrder(this.order).then(
            res => {
              console.log(res);
            });
        } else {
          for ( let i = 0 ; i < this.length ; i++) {
            this.order[i].olid = this.orderList.olid;
            this.orderPro.createOrder(this.order[i]).then(
              res => {
                console.log(res);
              });
          }
        }

        /*
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
         */
      });



  }
  checkBalance(): boolean {
    let balance: number = this.student.credit;
    let priceToDec: number = this.orderList.totalprice;
    let diff = Math.abs(balance - priceToDec);
    if (diff > 0) {
      return true;
    } else {
      return false;
    }
  }


  placeOrder() {
    let hasCredit: boolean = this.checkBalance();
    if(hasCredit) {
      console.log('user has credit to procced')
    } else {
      console.log('user has no credit ');
      return;
    }
    let balance: number = this.student.credit;
    console.log('user credit before ' + balance );
    let priceToDec: number = this.orderList.totalprice;
    let diff = Math.abs(balance - priceToDec);
    console.log('user credit after ' + diff );
    this.student.credit = diff;
    this.userPro.updateUser(this.student).then(
      res => console.log(res)
    );
    // clean cart
    this.userData.cleanCart().then(
      res => console.log(res)
    );
    this.orderList.status = "Incoming";
    this.orderLPro.updateOrderList(this.orderList).then(
      res => {
        console.log(res);
        this.navCtrl.setRoot("TrackingPage");
        let loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Your order has been received by the cafteria.<br> Order number is ' + this.orderList.olid ,
        });
        loading.present();
        setTimeout(() => {
          this.navCtrl.setRoot("TrackingPage");
        }, 1000);

        setTimeout(() => {
          loading.dismiss();
        }, 4000);
      }
    );

  }
  clearOrder(): any {
    // return back to 'Checkout Page'
    this.navCtrl.pop();
  }


}
