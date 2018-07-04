import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";


@IonicPage()
@Component({
  selector: 'page-quick-order-action',
  templateUrl: 'quick-order-action.html',
})
export class QuickOrderActionPage{

  public menuType : any ;
  private countItems: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public events: Events) {
    this.initView();
    // event incase the cart had been updated
    this.events.subscribe('cart:update', () => {
      this.userData.getItemsFromCart().then(res => {
        // console.log(res);
        this.countItems = res['length'];
      });
    });
  }

  private initView(): void {
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
      }
    });
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
