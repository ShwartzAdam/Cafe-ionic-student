/**
 * Quick order component - drink and food
 *
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import {ItemProvider} from '../../../providers/item/item';
import {Item} from '../../../model/item';
import {UserData} from "../../../providers/user-data/user-data";
import {BasketPage} from "../../../pages/basket/basket";
import {OrderList} from "../../../model/orderList";
import {Order} from "../../../model/order";
import {QuickOrderTicket} from "../../../pages/quick-order/quick-order-ticket";


@Component({
  selector: 'cor-drink-quick',
  templateUrl: 'cor-drink-quick.html'
})
export class CorDrinkQuickComponent implements OnInit{
  @ViewChild('content') content:any;
  // choosen item
  private itemsDrink: Item[] = new Array();
  private itemsFood: Item[] = new Array();
  // url for image
  public urlImageDrink: string = '';
  public urlImageFood: string = '';
  // item for display
  public itemChoosenDrink: string = 'Choose a drink';
  public itemChoosenFood: string = 'Choose a pastry';
  public itemDescDrink: string = '';
  public itemDescFood: string = '';
  public itemPriceDrink: number;
  public itemPriceFood: number;
  public displayDescDrink: boolean = false;
  public displayDescFood: boolean = false;
  // array of items
  public qDrink: number = 1;
  public qFood: number = 1;
  public drinkId: number = -1;
  public foodId: number = -1;
  // varibles from quick-order page taken out with nav controller
  public title : string;
  public url : string;
  // back clicked boolean
  private entered: number = 0;
  // enable buttons
  public isenabled: boolean = false;
  // present success time icon and final price after check time pressed
  public displaySuccessTime: boolean;
  public displayFinalPrice: boolean;
  // user id and number of items in the cart
  private userid: number;
  private countItems: number;
  // total price
  public totalPrice: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public itemProv: ItemProvider,
              public userData: UserData,
              public alertCtrl: AlertController) {
    this.title = this.navParams.get('name');
    this.url = this.navParams.get('url');
    // hide time
    this.displaySuccessTime = false;
    // get user id to start an order
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
  }
  ionViewDidEnter() {
    if(this.entered == 0) {
      //First Enter to Page
      this.entered = 1;
    }
    else{
      //Second Enter to Page
      this.clearOrder();
    }
  }
  clearOrder(){
    this.foodId = 1;
    this.qFood = 1;
    this.drinkId = 0;
    this.qDrink = 0;
    this.totalPrice = 0;
    this.displayFinalPrice = false;
    this.isenabled = false;
  }
  ngOnInit(): void {
    this.itemProv.getAllItemByType('Drinks').then(
      (_items: Item[]) => {
        _items.forEach(item => this.itemsDrink.push(item));
      });
    this.itemProv.getAllItemByType('Pastries').then(
      (_items: Item[]) => {
        _items.forEach(item => this.itemsFood.push(item));
      });
  }
  choose(s){
    if(s == 'Drink'){
      // present action sheet of Drinks
      this.presentActionSheet('Drink');
    } else if (s == 'Food') {
      // present action sheet of Pastery
      this.presentActionSheet('Pastry');
    }

  }
  presentActionSheet(s) {
    if( s == 'Drink') {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Choose Your Drink',
        buttons: this.createButtons('Drink')
      });
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Choose Your Pastry',
        buttons: this.createButtons('Pastry')
      });
      actionSheet.present();
    }

  }


  private createButtons(s) {
    if ( s == 'Drink'){
      let buttons = [];
      for (let index in this.itemsDrink) {
        let button = {
          text: this.itemsDrink[index].name + '  ' + this.itemsDrink[index].price + ' NIS',
          //icon: this.possibleButtons[index].icon,
          handler: () => {
            this.drinkId = this.itemsDrink[index].itemid;
            this.itemChoosenDrink = this.itemsDrink[index].name + '  ' + this.itemsDrink[index].price + ' NIS';
            this.itemDescDrink = this.itemsDrink[index].description;
            this.itemPriceDrink = this.itemsDrink[index].price;
            this.urlImageDrink = this.itemsDrink[index].url;
            this.displayDescDrink = true;
            return true;
          }
        };
        buttons.push(button);
      }
      return buttons;
    } else {
      let buttons = [];
      for (let index in this.itemsFood) {
        let button = {
          text: this.itemsFood[index].name + '  ' + this.itemsFood[index].price + ' NIS',
          //icon: this.possibleButtons[index].icon,
          handler: () => {
            this.foodId = this.itemsFood[index].itemid;
            this.itemChoosenFood = this.itemsFood[index].name + '  ' + this.itemsFood[index].price + ' NIS';
            this.itemDescFood = this.itemsFood[index].description;
            this.itemPriceFood = this.itemsFood[index].price;
            this.urlImageFood = this.itemsFood[index].url;
            this.displayDescFood = true;
            return true;
          }
        };
        buttons.push(button);
      }
      return buttons;
    }

  }


  calcOrder() {
    if(this.drinkId == -1 || this.foodId == -1){
      // drink wasnot choose and quaninty for order
      this.presentAlert(null);
      return;
    } else if ( this.qDrink == 0 || this.qFood == 0) {
      this.presentAlert('Q');
    }
    else {
      let dimensions = this.content.getContentDimensions();
      this.content.scrollTo(0, dimensions.contentHeight+100, 100);
      // calc
      let drinkSum = Math.imul(this.itemPriceDrink,this.qDrink);
      let foodSum = Math.imul(this.itemPriceFood,this.qFood);
      // sum it
      this.totalPrice = drinkSum + foodSum;
      // present full price for student
      this.displayFinalPrice = true;
      this.isenabled = true;
      // wait for proccess
    }
  }

  initOrder(){
    // create order and pass it to confirmation
    // in quick-order-ticket
    let orderList = new OrderList();
    orderList.totalprice = this.totalPrice;
    orderList.userid = this.userid;
    let orderDrink = new Order();
    orderDrink.qty = this.qDrink;
    orderDrink.itemid = this.drinkId;
    let orderFood = new Order();
    orderFood.qty = this.qFood;
    orderFood.itemid = this.foodId;
    let orderArr: Order[] = new Array();
    orderArr.push(orderDrink);
    orderArr.push(orderFood);
    this.navCtrl.push(QuickOrderTicket,{
      orderListParam: orderList,
      orderParam: orderArr,
      size: 2
    });
  }

  presentAlert(s) {
    if(s == 'Q') {
      let alert = this.alertCtrl.create({
        title: 'Error - Quantity',
        subTitle: 'Please choose the quantity you would like in order to proceed ',
        buttons: ['Got it...']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error - Item',
        subTitle: 'Please choose an item in order to proceed ',
        buttons: ['Got it...']
      });
      alert.present();
    }

  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }


}
