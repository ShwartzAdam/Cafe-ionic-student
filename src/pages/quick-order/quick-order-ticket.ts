import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
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
import {ProfilePage} from "../profile/profile";



@Component({
  selector: 'quick-order-ticket',
  templateUrl: 'quick-order-ticket.html',
})
export class QuickOrderTicket implements OnInit{
  @ViewChild(Timer) child : Timer;
  @ViewChild('content') content:any;

  //new vars
  private orderList = new OrderList();
  private order = new Order();
  private items: Item[] = new Array();
  private student: Student = new Student;
  private prepTotal: number = 0;
  // enable buttons
  public isenabled: boolean = false;
  public ischeckTimeEnable: boolean = false;
  public ischeckTimeClicked: boolean = false;
  public isReturnOffer: boolean = false;
  public pickUpTime: any;
  public orderTime: any;
  public orderTimeExtended: any;
  public length : number;
  public timeOffered: any;
  public startDatetimeMin: any;
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
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController){
  }

  ngOnInit(): void {
    this.orderList = this.navParams.get('orderListParam');
    this.order = this.navParams.get('orderParam');
    this.length = this.navParams.get('size');
    // console.log(this.length);

    this.totalPrice = this.orderList.totalprice;
    // console.log(this.orderList);
    // console.log(this.order);

    // set min time to order
    this.startDatetimeMin = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString();// set the current date time

    this.userPro.getUserById(this.orderList.userid).subscribe(
      _stu => {
        let stu: Student = new Student;
        stu.userid = this.orderList.userid;
        stu.firstname = _stu.firstname;
        stu.lastname = _stu.lastname;
        stu.url = _stu.url;
        stu.email = _stu.email;
        stu.role = _stu.role;
        stu.password = _stu.password;
        stu.phone = _stu.phone;
        stu.credit = _stu.credit;
        this.student = stu;
      });
    // loop on orders for items
    if(this.length == 1){
      // console.log('one item to checkout');
      this.itemPro.getItemById(this.order.itemid).subscribe(
        res => {
          // console.log(res);
          let item: Item = new Item;
          item.qty = this.order.qty;
          item.name = res.name;
          item.price = res.price;
          this.items.push(item);
        });

    } else {
      // console.log('two or more item to checkout');
      for (let i = 0 ; i < this.length ; i++) {
        this.itemPro.getItemById(this.order[i].itemid).subscribe(
          res => {
            // console.log(res);
            let item: Item = new Item;
            item.qty = this.order[i].qty;
            item.name = res.name;
            item.price = res.price;
            this.items.push(item);
          });
      }

    }
   // console.log(this.items);


  }
  public onChange(e){
    if(e == true) {
      //console.log('time count down has finished');
      this.navCtrl.pop();
    }
  }

  dateChanged(){
    if ( !this.ischeckTimeClicked ) {
      this.ischeckTimeEnable = true;
    } else {
      this.ischeckTimeEnable = false;

    }
  }

  checkTime(){
    this.checkBalance().then(
      res => {
        if(res) {
          // console.log('has credit to continue the purchase')
        } else{
          // console.log('has no credit , stop the proccess');
          return;
        }
      });
    this.ischeckTimeEnable = false;
    this.isReturnOffer = true;
    // if the user clicking again on the checktime -> remove orderlist from tables by delete call
    // is check time clicked alrady , is user have enough credit for it
    if ( !this.ischeckTimeClicked ) {
      // if the user doesnt clicked on the button -- first time
      this.ischeckTimeClicked = true;
      this.ischeckTimeEnable = false;
    } else {
      // user has already clicked
      return;
    }
    this.isenabled = true;
    //this.displayButtons = true;
    this.displaySuccessTime = true;
    // collect order time
    let orderTimeStr = moment(new Date().getTime().toString(),'hh:mm').add(3,'h').toISOString();
    let pickUpTimeStr = moment(this.orderTime,'hh:mm').add(3,'h').toISOString();
    this.orderTime = pickUpTimeStr;
    this.pickUpTime = pickUpTimeStr;
    // console.log(new Date().getTime().toString());
    // console.log(orderTimeStr);
    // console.log(pickUpTimeStr);
    this.orderTimeExtended = orderTimeStr;
    //this.orderList.ol_dttm_real = this.orderTimeExtended;
    this.orderList.ol_dttm = this.orderTime;
    // console.log(this.orderList);
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
          // console.log(this.prepTotal);
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
            this.orderList.totalpreptime  = this.orderList.totalpreptime + prep;
            // console.log(this.prepTotal);
          });
      }
      this.createOrder();
    }


  }

  createOrder() {
    // if order is size of one
    // then do this
    // else create to order
    // console.log(this.orderList);
    this.orderLPro.checkTimeOrderList(this.orderList).then(
      res => {
            // console.log(res);
            this.orderList.olid = res['olid'];
            // console.log(this.orderList);
            this.orderList.ol_dttm = res['ol_dttm'];
            const time = res['ol_dttm'];
            // console.log('Succesfuly offer this time');
            // console.log(time);
            this.timeOffered = time;
            // console.log(this.timeOffered);
            // present 1 minutes to decide if create orders items
            this.child.startTimer();
            let dimensions = this.content.getContentDimensions();
            this.content.scrollTo(0, dimensions.contentHeight+100, 100);
      });


  }

  checkBalance(): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.userPro.getUserCreditBalance(this.orderList.userid).then(
        (res:any) => {
          let balance= res['credit'];
          let priceToDec: number = this.orderList.totalprice;
          let diff = Math.abs(balance - priceToDec);
          // console.log(diff);
          if (diff > 0) {
            this.student.credit = diff;
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch((err) => {
          reject(false);
        });
    });
  }

  doConfirm() {
    const alert = this.alertCtrl.create({
      title: 'Place Order Confirmation',
      message: 'Are you sure you want to place this order?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            // console.log('Disagree clicked');
            return;
          }
        },
        {
          text: 'Agree',
          handler: () => {
            // console.log('Agree clicked');
            this.placeOrder();
          }
        }
      ]
    });
    alert.present();
  }


  placeOrder() {
    if ( this.length == 1) {
      // if order is size of one
      this.order.olid = this.orderList.olid;
      // console.log(this.order);
      this.orderPro.createOrder(this.order).then(
        res => {
          // console.log(res);
          // remove the qty of item id from storage
          this.itemPro.decItemQty(this.order.itemid,this.order.qty).then(
            res => {}
          )
        });
    } else {
      for ( let i = 0 ; i < this.length ; i++) {
        this.order[i].olid = this.orderList.olid;
        this.orderPro.createOrder(this.order[i]).then(
          res => {
            // console.log(res);
            // remove the qty of item if from storage
            this.itemPro.decItemQty(this.order[i].itemid,this.order[i].qty).then(
              res => {}
            )
          });
      }
    }

    //console.log(this.student);
    let usercredit = {
      'userid' : this.orderList.userid,
      'credit': this.student.credit
    };
    //console.log(usercredit);
    this.userPro.setUserCreditBalance(usercredit).then(
      res => {}
    );
    // clean cart
    this.userData.cleanCart().then(
      res => {}
    );
    this.orderList.status = "Incoming";
    // console.log(this.orderList);
    this.orderLPro.updateOrderList(this.orderList).then(
      res => {
        // console.log(res);
        let loading = this.loadingCtrl.create({
          spinner: 'crescent',
          content: '<div class="custom-spinner-container">' +
          '        <div class="custom-spinner-box"></div> ' +
          '        <div>Your order has been received by the Cafeteria !<br>'  +
          '          Order number is ' + this.orderList.olid  + ' </div> ' +
          '       </div>'

        });
        loading.present();
        setTimeout(() => {
          this.navCtrl.setRoot(ProfilePage);
        }, 1000);

        setTimeout(() => {
          loading.dismiss();
        }, 5000);
      }
    );

  }
  clearOrder(): any {
    // return back to 'Checkout Page'
    this.navCtrl.pop();
  }

}
