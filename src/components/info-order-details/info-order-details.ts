/**
 * Info Order Details - display order details with option to leave a review
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../model/order";
import {OrderList} from "../../model/orderList";
import {ItemProvider} from "../../providers/item/item";
import {Item} from "../../model/item";
import {NavController, NavParams} from "ionic-angular";
import {ReviewComponent} from "../review/review";

@Component({
  selector: 'info-order-details',
  templateUrl: 'info-order-details.html'
})
export class InfoOrderDetailsComponent implements OnInit{
  @Input() orderListId: number;
  @Input() orderList: OrderList;
  private orders: Order[] = new Array();
  private items: Item[] = new Array();
  public displayReview: boolean ;
  constructor(private orderPro: OrderProvider,
              private itemPro: ItemProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {}

  ngOnInit(): void {
    // get order list by order list id
    this.orderPro.getOrdersByOrderListIdSuc(this.orderListId).subscribe(res => {
      this.orders = res;
      // for each orders get item and store in array
      this.orders.forEach(order => {
        this.itemPro.getItemById(order.itemid).subscribe(
          res => {
              this.items.push(res);
          });
      });
      if(this.orderList.status == 'Complete' && this.orderList.hasreview == false){
        // display review button and let them know they need to leave a review
        this.displayReview = true;
      } else if ( this.orderList.status == 'Incoming' || this.orderList.status == 'Active' ) {
        // dont show review option
        this.displayReview = false;
      }
    });
  }
  public initReviewForm() {
    this.navCtrl.push(ReviewComponent, {
      orderListIdRev : this.orderListId,
      callback: this.myCallbackFunction
    });
  }
  myCallbackFunction = function(_params) {
    return new Promise((resolve, reject) => {
      const self = this;
      if(_params == true){
        self.displayReview = false;
      }
      resolve();
    });
  }


}
