import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {ItemProvider} from '../../../providers/item/item';
import {Item} from '../../../model/item';
import {UserData} from "../../../providers/user-data/user-data";
import {BasketPage} from "../../../pages/basket/basket";
import {OrderList} from "../../../model/orderList";
import {Order} from "../../../model/order";
import {QuickOrderTicket} from "../../../pages/quick-order/quick-order-ticket";


@Component({
  selector: 'drink-quick',
  templateUrl: 'drink-quick.html'
})
export class DrinkQuickComponent implements OnInit{
  // choosen item
  private items: Item[] = new Array();
  // url for image
  public urlImage: string = '';
  // item for display
  public itemChoosen: string = 'Choose a drink';
  public itemDesc: string = '';
  public itemPrice: number;
  public displayDesc: boolean = false;
  // array of items
  public qDrink: number = 0;
  public drinkId: number = -1;
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
              public userData: UserData) {
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
      console.log("First Enter to Page - Quick Order Details");
      this.entered = 1;
    }
    else{
      console.log("Second Enter to Page - Quick Order Details");
      this.clearOrder();
    }
  }
  clearOrder(){
    this.drinkId = 0;
    this.qDrink = 0;
    this.totalPrice = 0;
    this.displayFinalPrice = false;
    this.isenabled = false;
  }
  ngOnInit(): void {
    this.itemProv.getAllItemByType('Drink').then(
      (_items: Item[]) => {
        _items.forEach(item => this.items.push(item));
      });
    console.log(this.items);
  }
  chooseDrink(){
    this.presentActionSheet();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Your Drink',
      buttons: this.createButtons()
    });
    actionSheet.present();
  }


  private createButtons() {
    let buttons = [];
    for (let index in this.items) {
      let button = {
        text: this.items[index].name + '  ' + this.items[index].price + ' NIS',
        //icon: this.possibleButtons[index].icon,
        handler: () => {
          console.log('choosen item id ' + this.items[index].itemid);
          this.drinkId = this.items[index].itemid;
          this.itemChoosen = this.items[index].name + '  ' + this.items[index].price + ' NIS';
          this.itemDesc = this.items[index].description;
          this.itemPrice = this.items[index].price;
          this.displayDesc = true;
          return true;
        }
      };
      buttons.push(button);
    }
    return buttons;
  }


  calcOrder() {
    if(this.drinkId == -1 || this.qDrink == 0){
      // drink wasnot choose and quaninty for order
      console.log('error input');
      return;
    }
    else {
      // take item price and mul with quantity
      console.log(this.itemPrice);
      console.log(this.qDrink);
      // calc
      this.totalPrice = Math.imul(this.itemPrice,this.qDrink);
      // sum it
      console.log(this.totalPrice);
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
    let order = new Order();
    order.qty = this.qDrink;
    order.itemid = this.drinkId;
    this.navCtrl.push(QuickOrderTicket,{
      orderListParam: orderList,
      orderParam: order,
    });
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
