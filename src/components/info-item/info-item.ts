import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../model/item";
import {ItemProvider} from "../../providers/item/item";

@Component({
  selector: 'info-item',
  templateUrl: 'info-item.html'
})
export class InfoItemComponent implements OnInit{
  @Input() itemInput: number;
  private item: Item = new Item;

  constructor(private itemPro: ItemProvider) {
  }

  ngOnInit(): void {
    // console.log(this.itemInput);
    this.itemPro.getItemById(this.itemInput).subscribe(
      res => this.item = res
    )
  }

}
