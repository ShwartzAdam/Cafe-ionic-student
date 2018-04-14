import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuickOrderDetails } from "./quick-order-details";

@IonicPage()
@Component({
  selector: 'page-quick-order',
  templateUrl: 'quick-order.html',
})
export class QuickOrderPage {
  // items for ngfor list with icons
  Items : any ;
  constructor(public navCtrl: NavController,
              public navParams: NavParams){
   this.initQuickOrderMenu()
  }

  initQuickOrderMenu(){
    this.Items = [
      {name : "Drink And Croissant", src : "assets/imgs/cafe-cor.jpg"},
      {name : "Drink",  src : "assets/imgs/cafe.jpg" },
      {name : "Sandwich" ,  src : "assets/imgs/sandwich.jpg" },
      {name : "Snack" ,  src : "assets/imgs/snack.jpg" }
    ];
  }
  pushPage(item){
    console.log(item);
    this.navCtrl.push(QuickOrderDetails,{
      name : item.name,
      url : item.src
    });
  }


}
