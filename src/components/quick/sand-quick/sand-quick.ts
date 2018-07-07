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
  selector: 'sand-quick',
  templateUrl: 'sand-quick.html'
})
export class SandQuickComponent implements OnInit{
  @ViewChild('content') content:any;
  // choosen item
  private items: Item[] = new Array();
  // url for image
  public urlImage: string = '';
  // item for display
  public itemChoosen: string = 'Choose A Sandwich';
  public itemDesc: string = '';
  public itemPrice: number;
  public displayDesc: boolean = false;
  // array of items
  public qDrink: number = 1;
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
      // console.log("First Enter to Page - Quick Order Sandwich details");
      this.entered = 1;
    }
    else{
      // console.log("Second Enter to Page - Quick Order Sandwich Details");
      this.clearOrder();
    }
  }
  clearOrder(){
    this.drinkId = 0;
    this.qDrink = 1;
    this.totalPrice = 0;
    this.displayFinalPrice = false;
    this.isenabled = false;
  }
  ngOnInit(): void {
    this.itemProv.getAllItemByType('Sandwiches').then(
      (_items: Item[]) => {
        _items.forEach(item => this.items.push(item));
      });
    // console.log(this.items);
  }
  chooseDrink(){
    this.presentActionSheet();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.itemChoosen,
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
      // console.log('error input');
      this.presentAlert();
      return;
    }
    else {
      let dimensions = this.content.getContentDimensions();
      this.content.scrollTo(0, dimensions.contentHeight+100, 100);
      // take item price and mul with quantity
      // console.log(this.itemPrice);
      // console.log(this.qDrink);
      // calc
      this.totalPrice = Math.imul(this.itemPrice,this.qDrink);
      // sum it
      // console.log(this.totalPrice);
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
      size: 1
    });
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error - Input',
      subTitle: 'Please choose an item and also the quantity you would like in order to proceed ',
      buttons: ['Got it...']
    });
    alert.present();
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}

