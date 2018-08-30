import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../model/item";

@Component({
  selector: 'item-basket',
  templateUrl: 'item-basket.html'
})
export class ItemBasketComponent implements OnInit{
  @Input() item: Item;

  constructor(){
  }
  ngOnInit(): void {

  }


}
