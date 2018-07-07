import {Component, Input, OnInit} from '@angular/core';
import {NavParams, NavController, Events, ToastController} from "ionic-angular";
import {ItemProvider} from "../../providers/item/item";
import {Item} from "../../model/item";

@Component({
  selector: 'item-basket',
  templateUrl: 'item-basket.html'
})
export class ItemBasketComponent implements OnInit{
  @Input() item: Item;

  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public itemPro: ItemProvider,
              public events: Events,
              private toastCtrl: ToastController){
  }
  ngOnInit(): void {

  }
  /*
  quantity(_itemid,_action):void{
    if(_action == "Plus") {
      // inc
      // console.log("itemid = " + _itemid + " action = " +_action);
      this.items.forEach(item => {
        if(item.itemid == _itemid){
          item.qty++;
          // console.log("item id -> quantity inc successfuly");
        }
      });
    }else{
      // dec
      // console.log("itemid = " + _itemid + " action = " +_action);
      this.items.forEach(item => {
        if(item.itemid == _itemid){
          item.qty--;
          if(item.qty == 0){
            // delete item
            this.deleteItem(_itemid);
            // console.log("item id -> deleted < 1")
          }
          // console.log("item id -> quantity inc successfuly");
        }
      });
    }
    this.events.publish('cart:price' );
  }

  deleteItem(_itemid): any{
    // print the item id you want to remove
    // user data holds var and the cart itself , sending id of the item
    // will remove it from his local storage
    // console.log("Delete item id = " + _itemid);
    this.userData.removeItemFromCart(_itemid).then(
      () => {
        //console.log("Succesfuly remove item id = " + _itemid);
        this.event.publish('cart:delete');
      });

  }
*/

}
