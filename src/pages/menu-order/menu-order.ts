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

  private countItems: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData) {
    this.initView();
  }

  public pushPage(type) {
    let _type = type;
    console.log("Open page with " + _type + "type");
    this.navCtrl.push(MenuOrderDetails,{
      name : _type
    });
  }

  private initView(): void {
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
      }
    });
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
