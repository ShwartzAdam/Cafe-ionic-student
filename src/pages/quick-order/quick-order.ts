import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuickOrderDetails } from "./quick-order-details";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";

@IonicPage()
@Component({
  selector: 'page-quick-order',
  templateUrl: 'quick-order.html',
})
export class QuickOrderPage {
  // items for ngfor list with icons
  private Items : any ;
  private userid: number;
  private countItems: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData){
   this.initQuickOrderMenu()
  }

  initQuickOrderMenu(){
    this.Items = [
      {name : "Drink And Croissant", src : "assets/imgs/cafe-cor.jpg"},
      {name : "Drink",  src : "assets/imgs/cafe.jpg" },
      {name : "Sandwich" ,  src : "assets/imgs/sandwich.jpg" },
      {name : "Snack" ,  src : "assets/imgs/snack.jpg" }
    ];
    //saving in local storage
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
  pushPage(item){
    console.log(item);
    this.navCtrl.push(QuickOrderDetails,{
      name : item.name,
      url : item.src
    });
  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }



}
