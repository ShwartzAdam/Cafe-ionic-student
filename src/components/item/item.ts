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
  // review on the item
  reviews : any ;
  // if clicked on button hide reviews, buttons
  displayReviews : boolean = true;
  displayButton : boolean = true;
  displayTime : boolean = false;
  displayBottomNav : boolean = true;
  // input
  qItem : string;
  date : string;
  item: Item;
  public rootComponent = 'Information';
  private displayReview: boolean = false;
  private displayInfo: boolean = false;
  //tabOneRoot = ReviewItemComponent;
  //tabTwoRoot = InfoItemComponent;
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
    // GET THE ITEMS IN CART
    this.userData.getItemsFromCart().then(
      res => {
        // console.log(res);
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
    // console.log(item.itemid);
    this.userData.addItemToCart(item.itemid).then(
      res => {
        // if it succed insert item - publish event
        // console.log(res);
        this.events.publish('cart:update');
        this.presentToast(item.name , 'S');
      }).catch(reason => this.presentToast(item.name, 'F'));
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }
  presentToast(item: string, mesg: string) {
    if( mesg == 'F'){
      let toast = this.toastCtrl.create({
        message: item + ' is already in your cart ',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        // console.log('Dismissed toast');
      });

      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: item + ' has been added to your cart ',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        // console.log('Dismissed toast');
      });
      toast.present();
    }

  }

}
