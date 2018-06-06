import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuickOrderDetails } from "./quick-order-details";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../basket/basket";
import {DrinkQuickComponent} from "../../components/quick/drink-quick/drink-quick";
import {CorDrinkQuickComponent} from "../../components/quick/cor-drink-quick/cor-drink-quick";
import {SandQuickComponent} from "../../components/quick/sand-quick/sand-quick";
import {SnackQuickComponent} from "../../components/quick/snack-quick/snack-quick";

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
    let type = item.name;
    if(type == 'Drink'){
      this.navCtrl.push(DrinkQuickComponent,{
        name : item.name,
        url : item.src
      });
    } else if ( type == 'Drink And Croissant' ) {
        this.navCtrl.push(CorDrinkQuickComponent,{
          name : item.name,
          url : item.src
        });
    } else if ( type == 'Sandwich') {
        this.navCtrl.push(SandQuickComponent,{
          name : item.name,
          url : item.src
        });
    } else if ( type == 'Snack') {
        this.navCtrl.push(SnackQuickComponent,{
          name : item.name,
          url : item.src
        });
    } else {
        console.log('bad Input for quick menu');
    }

  }
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }



}
