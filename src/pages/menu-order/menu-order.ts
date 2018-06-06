import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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
              public userData: UserData) {
    this.initView();
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
      {name : "Dishes", src : "assets/imgs/food-menu.jpg"},
      {name : "Drink",  src : "assets/imgs/cafe.jpg" },
      {name : "Pastry",  src : "assets/imgs/pastery.png" },
      {name : "Sandwich" ,  src : "assets/imgs/sandwich.jpg" },
      {name : "Snack" ,  src : "assets/imgs/snack.jpg" }
    ];
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
