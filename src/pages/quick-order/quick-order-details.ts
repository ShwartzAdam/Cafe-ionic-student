import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {QuickOrderTicket} from "./quick-order-ticket";
import {ItemProvider} from "../../providers/item/item";
import {Item} from "../../model/item";
import {Order} from "../../model/order";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";

@Component({
  selector: 'quick-order-details',
  templateUrl: 'quick-order-details.html'
})
export class QuickOrderDetails {

  private userid: number;
  private countItems: number;
  private items: Item[] = new Array();
  // varibles from quick-order page taken out with nav controller
  title : string;
  url : string;
  // vars that belong to the form
  // missing sandwich vars
  drink : string;
  drinkId: number;
  crosId: number;
  crooisant : string;
  qDrink : number;
  qCross : number;
  // price
  totalPrice: number;
  // switched to present the right form
  displayDrinkList : boolean ;
  displayDrinkQuan : boolean ;
  displayCrosList : boolean ;
  displayCrosQuan : boolean ;
  // present success time icon and final price after check time pressed
  displaySuccessTime: boolean;
  displayFinalPrice: boolean;
  // hold the drinks option
  drinks: Item[];
  cors: Item[];
  // holds max 2 Orders
  orderFood: Order;
  orderDrink: Order;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemProv: ItemProvider,
              public userData: UserData) {
    this.title = this.navParams.get('name');
    this.url = this.navParams.get('url');

    this.userData.getUserId().then(
      res => {
        this.userid = res;
        this.userData.getItemsFromCart().then(
          res => {
            if(res){
              this.countItems = res.length;
            }
          }
        );
      });

    if(this.title == "Drink And Croissant"){
      //present Drink and Corissant form
      this.itemProv.getAllItems().subscribe( items => {
        let rawDataDrinks  = items.filter(item => item.type == "Drink");
        let rawDataCross = items.filter(item => item.name == "Croissant Chocolate");
        let rawDataCrosstwo = items.filter(item => item.name == "Croissant Butter");
        let corItem: any = [];
        corItem.push(rawDataCross);
        corItem.push(rawDataCrosstwo);
        this.cors = corItem;
        this.drinks = rawDataDrinks;
        console.log(this.cors);
      });
      // get the drinks items
      // get corr items for price and qnty
      this.displayDrinkList = true;
      this.displayDrinkQuan = true;
      this.displayCrosList = true;
      this.displayCrosQuan = true;
    }else if(this.title == "Drink"){
      // get the drinks items
      this.itemProv.getAllItems().subscribe( items => {
        let rawDataDrinks = items.filter(item => item.type == "Drink");
        this.drinks = rawDataDrinks;
      });
      // present Drink form
      this.displayDrinkList = true;
      this.displayDrinkQuan = true;
    }else if(this.title == "Sandwich"){
      //present sandwich form
    }else{
      // present snack form
    }
  }

  clearOrder(){
      // remove all var from input tags
  }

  calcOrder(){
    // check if time is good for cafeteria ..
    // display all good icon
    this.displaySuccessTime = true;
    // init orderList with orderItem
    // get drink and cors price by name from items
    let drinkChose = this.drinks.filter( drink => drink.name == this.drink);
    let corChose;
    if(this.crooisant == "Butter"){
      corChose = this.cors.pop();
    }else{
      this.cors.pop();
      corChose = this.cors.pop();
    }
    this.drinkId = drinkChose[0].itemid;
    this.crosId = corChose[0].itemid;

    console.log(corChose);
    console.log(drinkChose);
    console.log(corChose[0].price);
    // calc
    let corSumPrice = Math.imul(corChose[0].price,this.qCross);
    let driSumPrice = Math.imul(drinkChose[0].price,this.qDrink);
    // sum it
    this.totalPrice = corSumPrice + driSumPrice;
    console.log(this.totalPrice);
    // present full price for student
    this.displayFinalPrice = true;
    // wait for proccess
  }

  initOrder(){
      // create order and pass it to confirmation in quick-order-ticket
    this.itemProv.getItemById(this.drinkId).subscribe(
      item => {
          let _item: Item = new Item;
          _item.itemid = item.itemid;
          _item.name = item.name;
          _item.price = item.price;
          _item.url = item.url;
          _item.qty = this.qDrink;
          this.items.push(_item);
          console.log(_item);
      });
    this.itemProv.getItemById(this.crosId).subscribe(
      item => {
        let _item: Item = new Item;
        _item.itemid = item.itemid;
        _item.name = item.name;
        _item.price = item.price;
        _item.url = item.url;
        _item.qty = this.qCross;
        this.items.push(_item);
        console.log(_item);
      });
    this.navCtrl.push(QuickOrderTicket,{
      items: this.items,
      drinkid: this.drinkId,
      crosid: this.crosId,
      price :  this.totalPrice,
      drink : this.drink,
      cross : this.crooisant,
      qDrink : this.qDrink,
      qCross : this.qCross
    });
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }


}
