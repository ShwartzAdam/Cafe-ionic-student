/**
 * Info order component
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {OrderList} from "../../model/orderList";
import {UserData} from "../../providers/user-data/user-data";
import {OrderListProvider} from "../../providers/order-list/order-list";

@Component({
  selector: 'info-order',
  templateUrl: 'info-order.html'
})
export class InfoOrderComponent implements OnInit{
  @Input() status: string;
  private userId: number;
  private orderList: OrderList[] = new Array();
  public displayEmptyMessage: boolean = false;

  constructor(public userData: UserData,
              public orderListPro: OrderListProvider) {}

  ngOnInit(): void {
    this.userData.getUserId().then(
      res => {
        this.userId = res;
        this.initView();
      });
  }

  private initView() {
    if(this.status == 'open'){
      // get all order who are active or incoming
      // get for every orderlist his order
      this.orderList = new Array();
      this.orderListPro.getOrderListByUserId(this.userId).subscribe(
        res => {
          const incoming = res.filter(order => (order.status === 'Incoming' || order.status === 'Active'));
          this.orderList = incoming;
          let len = this.orderList.length;
          if( len == 0 ) {
            this.displayEmptyBookOrder();
          }

        })
    } else if ( this.status == 'close') {
      // get all order who are complete
      // get for every orderlist his order
      this.orderList = new Array();
      this.orderListPro.getOrderListByUserId(this.userId).subscribe(
        res => {
          const done = res.filter(order => order.status === 'Complete');
          this.orderList = done;
          let len = this.orderList.length;
          if( len == 0 ) {
            // display empty order book
            this.displayEmptyBookOrder();
          }

        })
    }
  }

  public displayEmptyBookOrder(){
      this.displayEmptyMessage = true;
  }

}
