import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {ItemComponent} from "../../components/item/item";
import {ItemProvider} from "../../providers/item/item";
import {Item} from "../../model/item";
import {UserData} from "../../providers/user-data/user-data";

@Component({
  selector: 'page-menu-order-details',
  templateUrl: 'menu-order-details.html'
})
export class MenuOrderDetails {

  // varibles from quick-order page taken out with nav controller
  private title : string;
  private  url : string;
  // items list from server
  private itemList : Item[] = new Array();
  // holds the number of items in the basket
  private countItems: number;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemProv: ItemProvider,
              public userData: UserData,
              public events: Events) {
    // get the values from prev page
    this.title = this.navParams.get('name');
    this.url = this.navParams.get('url');
    // update cart bedge
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
        console.log(this.countItems);
      }
    });
    this.initView();
  }
  private initView() {
    // checking what king of items to show by Type
    if(this.title == "Dishes"){
      // call Rest API for items
      this.getItemsByType("Dish");
      console.log("Food Menu")
    } else if (this.title == "Drink") {
      this.getItemsByType("Drink");
      console.log("Drinks Menu")
    } else if (this.title == "Snack") {
        this.getItemsByType('Snack');
    } else if (this.title == "Pastry") {
        this.getItemsByType('Pastry');
      console.log("Drinks Menu")
    } else {
        this.getItemsByType('Sandwich');
    }
  }
  pushItem(item) {
    console.log(item);
    this.navCtrl.push(ItemComponent,
      {
        item: item
      });
  }

  private getItemsByType(s: string) {
    this.itemProv.getAllItemByType(s).then(
      (res : any[]) => {
        res.forEach(item => this.itemList.push(item))
      });
  }
}
