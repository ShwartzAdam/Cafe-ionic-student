import { Component,OnInit } from '@angular/core';
import { NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {ItemProvider} from '../../../providers/item/item';
import {Item} from '../../../model/item';

@Component({
  selector: 'drink-quick',
  templateUrl: 'drink-quick.html'
})
export class DrinkQuickComponent implements OnInit{
  // choosen item
  private items: Item[] = new Array();
  // url for image
  public urlImage: string = '';
  // item for display
  public itemChoosen: string = 'Choose a drink';
  public itemDesc: string = '';
  public displayDesc: boolean = false;
  // array of items
  qDrink: number;
  drinkId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public itemProv: ItemProvider) {

  }
  ngOnInit(): void {
    this.itemProv.getAllItemByType('Drink').then(
      (_items: Item[]) => {
        _items.forEach(item => this.items.push(item));
      });
    console.log(this.items);
  }
  chooseDrink(){
    this.presentActionSheet();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Your Drink',
      buttons: this.createButtons()
    });
    actionSheet.present();
  }


  private createButtons() {
    let buttons = [];
    for (let index in this.items) {
      let button = {
        text: this.items[index].name + '  ' + this.items[index].price + ' NIS',
        //icon: this.possibleButtons[index].icon,
        handler: () => {
          console.log('choosen item id ' + this.items[index].itemid);
          this.drinkId = this.items[index].itemid;
          this.itemChoosen = this.items[index].name + '  ' + this.items[index].price + ' NIS';
          this.itemDesc = this.items[index].description;
          this.displayDesc = true;
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

}
