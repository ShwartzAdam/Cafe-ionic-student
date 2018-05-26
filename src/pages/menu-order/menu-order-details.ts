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
  title : string;
  url : string;
  // switched to present the right form
  displayFoodList : boolean ;
  displayDrinkList : boolean ;
  // items list from server
  itemList : Item[];
  item: Item;
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

    this.initView();
  }
  private initView() {
    // checking what king of items to show by Type
    if(this.title == "Food"){
      // call Rest API for items
      this.getAllItems("Food");
      //present Food Menu
      this.displayFoodList = true;
      console.log("Food Menu")
    }else{
      this.getAllItems("Drink");
      // present Drinks Menu
      this.displayDrinkList = true;
      console.log("Drinks Menu")
    }
    // update cart bedge
    this.userData.getItemsFromCart().then(res => {
      if(res){
        this.countItems = res.length;
        console.log(this.countItems);
      }
    });
  }
  pushItem(item) {
    console.log(item);
    this.navCtrl.push(ItemComponent,
      {
        item: item
      });
  }

  getAllItems(type){
    this.itemProv.getAllItems().subscribe((itemList: Item[]) => {
      if(type == "Food"){
        //filter the item list and remain only items with TYPE = FOOD
        let rawData = itemList.filter(item => item.type == "Food");
        this.itemList = rawData;
      }
      else{
        // filter the item list and remain only items with TYPE = DRINK
        let rawData = itemList.filter(item => item.type == "Drink");
        this.itemList = rawData;
      }
      console.log(this.itemList)
    });
  }



}
