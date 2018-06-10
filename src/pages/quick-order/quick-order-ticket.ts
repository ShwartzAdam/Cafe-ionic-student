import {Component, OnInit, ViewChild} from '@angular/core';
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
import {Timer} from "../../components/countdown-timer/timer";


@Component({
  selector: 'quick-order-ticket',
  templateUrl: 'quick-order-ticket.html',
})
export class QuickOrderTicket implements OnInit{
  @ViewChild(Timer) child : Timer;
  //new vars
  private orderList = new OrderList();
  private order = new Order();
  private items: Item[] = new Array();
  private student: Student = new Student;
  private prepTotal: number = 0;
  // enable buttons
  public isenabled: boolean = false;
  public ischeckTimeEnable: boolean = false;
  public isReturnOffer: boolean = false;
  public pickUpTime: any;
  public orderTime: any;
  public orderTimeExtended: any;
  public length : number;
  public timeOffered: any;
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
    console.log(this.length);

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
  public onChange(e){
    if(e == true) {
      console.log('time count down has finished');
      this.navCtrl.pop();
    }
  }

  dateChanged(){
    this.ischeckTimeEnable = true;
  }

  checkTime(){
    this.isReturnOffer = true;
    // if the user clicking again on the checktime -> remove orderlist from tables by delete call
    this.deleteOrder();
    this.isenabled = true;
    //this.displayButtons = true;
    this.displaySuccessTime = true;
    // collect order time
    let orderTimeStr = moment(new Date().getTime().toString(),'hh:mm:ss').add(3,'h').toISOString();
    let pickUpTimeStr = moment(this.orderTime,'hh:mm:ss').add(3,'h').toISOString();
    this.orderTime = pickUpTimeStr;
    this.pickUpTime = pickUpTimeStr;
    console.log(new Date().getTime().toString());
    console.log(orderTimeStr);
    console.log(pickUpTimeStr);
    this.orderTimeExtended = orderTimeStr;
    //this.orderList.ol_dttm_real = this.orderTimeExtended;
    this.orderList.ol_dttm = this.orderTime;
    console.log(this.orderList);
    // set orderlist status to none
    this.orderList.status = '';
    // get item for prep time
    if ( this.length == 1){
      this.itemPro.getItemById(this.order.itemid).subscribe(
        res => {
          let timePrepItem = res.preptime;
          let quantity = this.order.qty;
          let prep: number = Math.imul(timePrepItem, quantity);
          this.prepTotal = prep;
          console.log(this.prepTotal);
          this.orderList.totalpreptime = this.prepTotal;
          this.createOrder();
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
      this.orderList.totalpreptime = this.prepTotal;
      this.createOrder();
    }


  }

  createOrder() {
    // if order is size of one
    // then do this
    // else create to order
    console.log(this.orderList);
    this.orderLPro.checkTimeOrderList(this.orderList).then(
      res => {
            console.log(res);
            this.orderList.olid = res['olid'];
            console.log(this.orderList);
            let time = res['ol_dttm'];
            console.log('Succesfuly offer this time');
            console.log(time);
            this.timeOffered = time;
            console.log(this.timeOffered);
            // present 1 minutes to decide if create orders items
            this.child.startTimer();


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
        let loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Your order has been received by the Cafeteria !<br> Order number is ' + this.orderList.olid ,
        });
        loading.present();
        setTimeout(() => {
          this.navCtrl.setRoot("HomePage");
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


  private deleteOrder() {

  }
}
