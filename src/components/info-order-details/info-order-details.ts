import {Component, Input, OnInit} from '@angular/core';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../model/order";
import {OrderList} from "../../model/orderList";
import {ItemProvider} from "../../providers/item/item";
import {Item} from "../../model/item";

@Component({
  selector: 'info-order-details',
  templateUrl: 'info-order-details.html'
})
export class InfoOrderDetailsComponent implements OnInit{
  @Input() orderListId: number;
  @Input() orderList: OrderList;
  private orders: Order[] = new Array();
  private items: Item[] = new Array();

  constructor(private orderPro: OrderProvider,
              private itemPro: ItemProvider) {}

  ngOnInit(): void {
    console.log(this.orderListId);
    console.log(this.orderList);
    this.orderPro.getOrdersByOrderListIdSuc(this.orderListId).subscribe(res => {
      console.log(res);
      this.orders = res;
      this.orders.forEach(order => {
        this.itemPro.getItemById(order.itemid).subscribe(
          res => {
              this.items.push(res);
          });
      });
    });
  }

}
