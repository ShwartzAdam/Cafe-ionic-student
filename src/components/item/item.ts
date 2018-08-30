/**
 * Item component
 *
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, NavController, Events, ToastController} from "ionic-angular";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../../pages/basket/basket";
import {Item} from "../../model/item";

@Component({
  selector: 'item',
  templateUrl: 'item.html'
})
export class ItemComponent implements OnInit{

  private countItems: number;
  // details on the items
  itemid : number;
  title : string;
  url : string;
  desc : string;
  price : string;
  // if clicked on button hide reviews, buttons
  displayButton : boolean = true;
  displayTime : boolean = false;
  // input
  date : string;
  item: Item;
  public rootComponent = 'Information';
  private displayReview: boolean = false;
  private displayInfo: boolean = false;

  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public userData: UserData,
              public events: Events,
              private toastCtrl: ToastController){
    this.item = this.navParams.get('item');
    this.events.subscribe('cart:update', () => {
      this.userData.getItemsFromCart().then(res => {
          this.countItems = res['length'];
      });
    });
  }
  ngOnInit(): void {
    // fetch the items from the cart and store
    this.userData.getItemsFromCart().then(
      res => {
        if(res){
          this.countItems = res.length;
        }
      }
    );

    if(this.rootComponent == 'Information') {
      this.selectedInformation();
    } else {
      this.selectedReview();
    }
  }

  selectedReview() {
    this.displayReview = true;
    this.displayInfo = false;
  }

  selectedInformation() {
    this.displayReview = false;
    this.displayInfo = true;
  }

  addToCart(item){
    this.userData.addItemToCart(item.itemid).then(
      res => {
        // console.log(res);
        this.events.publish('cart:update');
        this.presentToast(item.name , 'S');
      }).catch(reason => this.presentToast(item.name, 'F'));
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }
  presentToast(item: string, mesg: string) {
    // item in the basket already
    if( mesg == 'F'){
      let toast = this.toastCtrl.create({
        message: item + ' is already in your cart ',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
      });

      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: item + ' has been added to your cart ',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
    }

  }

}
