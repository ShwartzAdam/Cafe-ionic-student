/**
 * Menu order component - display all items with type
 */
import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";

@Component({
  selector: 'page-menu-order',
  templateUrl: 'menu-order.html',
})
@IonicPage()
export class MenuOrderPage {
  public menuType : any ;
  public countItems: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public events: Events) {
    this.initView();
    // Event in case the cart had been updated
    this.events.subscribe('cart:update', () => {
      this.userData.getItemsFromCart().then(res => {
        this.countItems = res['length'];
      });
    });
  }

  private initView(): void {
    // Update cart
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
      }
    });
    // Menu options
    this.menuType = [
      {name : "Dishes", src : "assets/order-images/dishes.jpg"},
      {name : "Drinks",  src : "assets/order-images/cafe.jpg" },
      {name : "Pastries",  src : "assets/order-images/pastery.png" },
      {name : "Sandwiches" ,  src : "assets/order-images/sandwich.jpg" },
      {name : "Snacks" ,  src : "assets/order-images/snack.jpg" }
    ];
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
