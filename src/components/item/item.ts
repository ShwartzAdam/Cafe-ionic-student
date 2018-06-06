import { Component } from '@angular/core';
import {NavParams, NavController, Events, ToastController} from "ionic-angular";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../../pages/basket/basket";
import {Item} from "../../model/item";

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent {

  private countItems: number;
  // details on the items
  itemid : number;
  title : string;
  url : string;
  desc : string;
  price : string;
  // review on the item
  reviews : any ;
  // if clicked on button hide reviews, buttons
  displayReviews : boolean ;
  displayButton : boolean;
  displayTime : boolean;
  displayBottomNav : boolean;
  // input
  qItem : string;
  date : string;
  item: Item;
  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public userData: UserData,
              public events: Events,
              private toastCtrl: ToastController){
    this.item = this.navParams.get('item');

    // present review and button for order
    this.displayReviews = true;
    this.displayButton = true;
    // hide time
    this.displayTime = false;
    this.displayBottomNav = true;

    // init cart
    this.userData.getItemsFromCart().then( res => {
          if(res){
            this.countItems = res.length;
          }
      });
    this.events.subscribe('cart:update', () => {
          this.userData.getItemsFromCart().then(res => {
              if(res == null) {
                this.countItems = 1;
              }else{
                this.countItems = res.length + 1;
              }

          });
      });
  }

  addToCart(item){
    console.log(item.itemid);
    this.userData.addItemToCart(item.itemid);
    this.events.publish('cart:update');
    this.presentToast(item.name);
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }
  presentToast(item: string) {
    let toast = this.toastCtrl.create({
      message: item + ' has been added to your cart ',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
