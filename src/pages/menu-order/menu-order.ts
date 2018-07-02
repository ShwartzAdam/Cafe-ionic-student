import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { MenuOrderDetails } from "./menu-order-details";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";


@Component({
  selector: 'page-menu-order',
  templateUrl: 'menu-order.html',
})
@IonicPage()
export class MenuOrderPage {
  private items : any ;
  private countItems: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public events: Events) {
    this.initView();
    // event incase the cart had been updated
    this.events.subscribe('cart:update', () => {
      this.userData.getItemsFromCart().then(res => {
        console.log(res);
        this.countItems = res['length'];
      });
    });
  }

  public pushPage(item) {
    let name = item.name;
    console.log("Open page with " + name + "type");
    this.navCtrl.push(MenuOrderDetails,{
      name : name,
      url : item.src
    });
  }

  private initView(): void {
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
      }
    });
    this.items = [
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
  public updateCart(){
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
        console.log(this.countItems);
      }
    });
  }

}
