import { Component } from '@angular/core';
import {NavParams, NavController, Events} from "ionic-angular";
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
              public events: Events){
    this.item = this.navParams.get('item');
    // call review service and bring all the review for this items or best 3
    this.reviews = [
      {name : "Adam Shwartz" , location : "Ramat Gan" , stars : "4" ,content: " ''I stumbled on this undiscovered gem right in our neighboorhood. The waitress was prompt and polite. Everything was just so yummy. The entree I had was sublime. Satisfactory experience, will come again.'' "},
      {name : "Almog Assulin" , location : "Tel-Aviv" , stars : "4" ,content: " ''It was much better than I expected. The food was cooked to perfection. Try out the huge selection of incredible appetizers. After my meal, I was knocked into a food coma. They got a new customer for life!'' "},
      {name : "Ben Kochavi" , location : "Jerusalam" , stars : "5" ,content: " ''I've got a fetish for good food and this place gets me hot! I want to hire their decorator to furnish my apartment. The food is simply to die for. I'd give more than 5 stars if I could!'' "}
    ];

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

  addToCart(){
    this.userData.addItemToCart(this.itemid);
    console.log(this.itemid);
    this.events.publish('cart:update');
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
