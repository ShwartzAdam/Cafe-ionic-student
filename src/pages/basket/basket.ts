// Basket component - present all items the user has added to the basket

import { Component } from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
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
  // Item in the basket
  private items: Item[] = new Array();
  private totalPrice: number = 0;
  // Orders in bakset
  private ordersItem: Order[] = new Array();
  private userid: number;
  constructor(public userData: UserData,
              public itemProvider: ItemProvider,
              public event: Events,
              public navCtrl: NavController) {
    // Init func to display the items
    this.initView();
    this.userData.getUserId().then(
      res => {
                this.userid = res;
          }
    );

    // This code subscribe event to a publish call 'cart:delete'
    this.event.subscribe('cart:delete' , () => {
      this.items = [];
      this.totalPrice = 0;
      this.initView();
      this.event.publish('cart:price');
    });
    // Event listen to a change in cart price
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
      this.items = new Array();
      this.totalPrice = 0;
    }else if(res.length > 1 ){
      for(let i = 0; i < res.length ; i++) {
        this.itemProvider.getItemById(res[i]["itemid"]).subscribe(
          (item : Item) => {
            // More the one item
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
            // Only one item
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
        if(res == null ){
          this.updateView(null);
        }else{
          this.updateView(res);
          // Clac for each
          this.ordersItem = new Array();
          for(let i = 0 ; i < res.length ; i++)
          {
            let order: Order = new Order;
            (order as any).itemid = res[i]["itemid"];
            (order as any).qty = 1;
            this.ordersItem.push(order);
          }
        }
      }
    ).catch();

  }

  deleteItem(_itemid): any{
    // Print the item id you want to remove
    // User data holds var and the cart itself , sending id of the item
    // Will remove it from his local storage
    this.userData.removeItemFromCart(_itemid).then(
      () => {
        this.event.publish('cart:delete');
      });

  }

  checkOut():void{
    // Create order list and prepare the object
    let orderList = new OrderList();
    orderList.totalprice = this.totalPrice;
    orderList.userid = this.userid;
    // If order size is one
    if( this.items.length == 1 ){
      let order = new Order();
      order.qty = this.items[0].qty;
      order.itemid = this.items[0].itemid;
      this.navCtrl.push(QuickOrderTicket, {
        orderListParam: orderList,
        orderParam: order,
        size: this.items.length
      });
    } else {
      //  If order size is bigger then one
      for(let i = 0 ; i < this.items.length ; i++ ){
        this.ordersItem[i].qty = this.items[i].qty;
      }
      // Finnaly push it ticket page
      this.navCtrl.push(QuickOrderTicket, {
        orderListParam: orderList,
        orderParam: this.ordersItem,
        size: this.items.length
      });
    }

  }

  quantity(_itemid,_action):void{
    if(_action == "Plus") {
        // Inc
      this.items.forEach(item => {
          if(item.itemid == _itemid){
            item.qty++;
          }
        });
    }else{
        // Dec
        this.items.forEach(item => {
          if(item.itemid == _itemid){
            item.qty--;
            if(item.qty == 0){
              // delete item
              this.deleteItem(_itemid);
            }
          }
        });
    }
    // After inc or dec , publish event with change in price
    this.event.publish('cart:price' );
  }

}
