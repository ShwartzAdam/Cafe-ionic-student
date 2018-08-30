/**
 * Item Menu Component
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {NavParams, NavController, Events, ToastController} from "ionic-angular";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../../pages/basket/basket";
import {ItemProvider} from "../../providers/item/item";
import {ItemComponent} from "../item/item";

@Component({
  selector: 'item-menu',
  templateUrl: 'item-menu.html'
})
export class ItemMenuComponent implements OnInit{
  @Input() type: string;
  public itemList: any;

  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public itemPro: ItemProvider,
              public userData: UserData,
              public events: Events,
              private toastCtrl: ToastController){
  }
  ngOnInit(): void {
    this.itemPro.getAllItemByType(this.type).then(
      res => this.itemList = res
    );
  }
  pushItem(item) {
    this.navCtrl.push(ItemComponent,
      {
        item: item
      });
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }
  presentToast(item: string, mesg: string) {
    if( mesg == 'F'){
      let toast = this.toastCtrl.create({
        message: item + ' is already in your cart ',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
      });

      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: item + ' has been added to your cart ',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();
    }

  }

}
