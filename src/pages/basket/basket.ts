import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {ItemProvider} from "../../providers/item/item";
import {Order} from "../../model/order";
import {Item} from "../../model/item";
import {QuickOrderTicket} from "../quick-order/quick-order-ticket";
import {OrderList} from "../../model/orderList";



@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {
  // items in the basket
  private items: Item[] = new Array();
  private totalPrice: number = 0;
  private ordersItem: Order[] = new Array();
  private userid: number;
  constructor(public userData: UserData,
              public itemProvider: ItemProvider,
              public event: Events,
              public navCtrl: NavController,
              public navParam: NavParams) {
    // function init view with student items in the basket
    this.initView();
    this.userData.getUserId().then(
      res => {
                this.userid = res;
                // console.log(this.userid);
          }
    );

    // this code subscribe event to a publish call 'cart:delete'
    this.event.subscribe('cart:delete' , () => {
      this.items = [];
      this.totalPrice = 0;
      this.initView();
      this.event.publish('cart:price');
    });
    // event listen to a change in cart price
    this.event.subscribe('cart:price' , () => {
      this.totalPrice = 0;
      this.items.forEach(item => {
        this.totalPrice = ((this.totalPrice) + Math.imul(item.qty,item.price));
      });
    });
  }

  //
  updateView(res){
    if(res == null){
      // console.log("Empty Cart");
      this.items = new Array();
      this.totalPrice = 0;
    }else if(res.length > 1 ){
      for(let i = 0; i < res.length ; i++) {
        this.itemProvider.getItemById(res[i]["itemid"]).subscribe(
          (item : Item) => {
            // more the one item
            let _item: Item = new Item;
            _item.itemid = item.itemid;
            _item.name = item.name;
            _item.price = item.price;
            _item.url = item.url;
            _item.qty = 1;
            this.items.push(_item);
            this.totalPrice = ((this.totalPrice) + Math.imul(_item.qty, _item.price));
          }
        );
      }
    }else if(res.length == 1){
        this.itemProvider.getItemById(res[0]["itemid"]).subscribe(
          (item : Item) => {
            // only one item
            let _item: Item = new Item;
            _item.itemid = item.itemid;
            _item.name = item.name;
            _item.price = item.price;
            _item.url = item.url;
            _item.qty = 1;
            this.items.push(_item);
            this.totalPrice = Math.imul(_item.qty, _item.price);
          }
        );
    }else{
        this.itemProvider.getItemById(res).subscribe(
          (item : Item) => {
            let _item: Item = new Item;
            _item.itemid = item.itemid;
            _item.name = item.name;
            _item.price = item.price;
            _item.url = item.url;
            _item.qty = 1;
            this.items.push(_item);
            this.totalPrice = item.price * item.qty;
          }
        );
       }
    }

  initView(){
    this.userData.getItemsFromCart().then(
      res => {
        // console.log(res);
        if(res == null ){
          this.updateView(null);
        }else{
          this.updateView(res);
          // clac for each
          // console.log(res);
          this.ordersItem = new Array();
          for(let i = 0 ; i < res.length ; i++)
          {
            let order: Order = new Order;
            (order as any).itemid = res[i]["itemid"];
            (order as any).qty = 1;
            // console.log(order);
            this.ordersItem.push(order);
            // console.log(this.items);
          }
          // console.log(this.ordersItem);
          // console.log(this.items);
        }
      }
    ).catch();

  }

  deleteItem(_itemid): any{
    // print the item id you want to remove
    // user data holds var and the cart itself , sending id of the item
    // will remove it from his local storage
    // console.log("Delete item id = " + _itemid);
    this.userData.removeItemFromCart(_itemid).then(
      () => {
        //console.log("Succesfuly remove item id = " + _itemid);
        this.event.publish('cart:delete');
      });

  }

  checkOut():void{
    // console.log(this.items);
    // console.log(this.ordersItem);
    let orderList = new OrderList();
    orderList.totalprice = this.totalPrice;
    orderList.userid = this.userid;
    if( this.items.length == 1 ){
      let order = new Order();
      order.qty = this.items[0].qty;
      order.itemid = this.items[0].itemid;
      // console.log(order);
      this.navCtrl.push(QuickOrderTicket, {
        orderListParam: orderList,
        orderParam: order,
        size: this.items.length
      });
    } else {
      for(let i = 0 ; i < this.items.length ; i++ ){
        this.ordersItem[i].qty = this.items[i].qty;
      }
      this.navCtrl.push(QuickOrderTicket, {
        orderListParam: orderList,
        orderParam: this.ordersItem,
        size: this.items.length
      });
    }

    // console.log(this.ordersItem);
    // console.log(orderList);

  }

  quantity(_itemid,_action):void{
    if(_action == "Plus") {
        // inc
      // console.log("itemid = " + _itemid + " action = " +_action);
      this.items.forEach(item => {
          if(item.itemid == _itemid){
            item.qty++;
            // console.log("item id -> quantity inc successfuly");
          }
        });
    }else{
        // dec
        // console.log("itemid = " + _itemid + " action = " +_action);
        this.items.forEach(item => {
          if(item.itemid == _itemid){
            item.qty--;
            if(item.qty == 0){
              // delete item
              this.deleteItem(_itemid);
              // console.log("item id -> deleted < 1")
            }
            // console.log("item id -> quantity inc successfuly");
          }
        });
    }
    this.event.publish('cart:price' );
  }

}
