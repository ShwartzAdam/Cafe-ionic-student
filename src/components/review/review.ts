import { Component } from '@angular/core';
import {NavParams, NavController, Events} from "ionic-angular";
import {UserData} from "../../providers/user-data/user-data";
import {BasketPage} from "../../pages/basket/basket";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../model/order";
import {Item} from "../../model/item";
import {Review} from "../../model/review";
import {ReviewList} from "../../model/reviewList";
import {ItemProvider} from "../../providers/item/item";

@Component({
  selector: 'review',
  templateUrl: 'review.html'
})
export class ReviewComponent {
  private orderListId: number;
  private orders: Order[] = new Array();
  private items: Item[] = new Array();
  private review: Review;
  private reviewList: ReviewList;
  private userid: number;
  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public userData: UserData,
              public orderListPro: OrderListProvider,
              public orderPro: OrderProvider,
              public itemPro: ItemProvider) {
    this.orderListId = this.navParams.get('orderListIdRev');
    this.initView();
  }
  initView(): any {
    // get user id
    this.userData.getUserId().then(res => this.userid = res);
    // get orders
    this.orderPro.getOrdersByOrderListId(this.orderListId).then( (res: any) => {
      res.forEach(order => {
        this.orders.push(order);
        this.itemPro.getItemById(order.itemid).subscribe(
          res => {this.items.push(res)}
        )
      });

    });
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
