import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
      {name : "Drinks And Croissants", src : "assets/order-images/cafe-cor.jpg"},
      {name : "Drinks",  src : "assets/order-images/cafe.jpg" },
      {name : "Sandwiches" ,  src : "assets/order-images/sandwich.jpg" },
      {name : "Snacks" ,  src : "assets/order-images/snack.jpg" }
    ];
    //saving in local storage
    this.userData.getUserId().then(
      res => {
        this.userid = res;
        this.userData.getItemsFromCart().then(
          res => {
            if(res){
              this.countItems = res['length'];
            }
          }
        );
      });
  }
  pushPage(item){
    let type = item.name;
    if(type == 'Drinks'){
      this.navCtrl.push(DrinkQuickComponent,{
        name : item.name,
        url : item.src
      });
    } else if ( type == 'Drinks And Croissants' ) {
        this.navCtrl.push(CorDrinkQuickComponent,{
          name : item.name,
          url : item.src
        });
    } else if ( type == 'Sandwiches') {
        this.navCtrl.push(SandQuickComponent,{
          name : item.name,
          url : item.src
        });
    } else if ( type == 'Snacks') {
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
