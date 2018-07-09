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
    //console.log(this.orderListId);
    //console.log(this.orderList);
    this.orderPro.getOrdersByOrderListIdSuc(this.orderListId).subscribe(res => {
      //console.log(res);
      this.orders = res;
      this.orders.forEach(order => {
        this.itemPro.getItemById(order.itemid).subscribe(
          res => {
              this.items.push(res);
          });
      });
      // console.log(this.orderList);
      if(this.orderList.status == 'Complete' && this.orderList.hasreview == false){
        // display review button and let them know they need to leave a review
        this.displayReview = true;
        // console.log('enter review option');
      } else if ( this.orderList.status == 'Incoming' || this.orderList.status == 'Active' ) {
        // dont show review option
        this.displayReview = false;
        // console.log('enter no review option');
      } else {
        // console.log('no valid status for orderlist');
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
      //console.log(_params);
      //console.log(self);
      if(_params == true){
        self.displayReview = false;
        //console.log(self);
      }
      resolve();
    });
  }


}
