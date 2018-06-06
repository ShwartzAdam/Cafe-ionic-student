import { Component,ViewChild } from '@angular/core';
import {NavParams, NavController, Events,Nav} from "ionic-angular";
import { MenuOrderPage } from '../../pages/menu-order/menu-order';
import { TrackingPage}  from '../../pages/tracking/tracking';
import { LoginPage } from "../../pages/login/login";
import { WalletPage } from "../../pages/wallet/wallet";
import { BasketPage } from "../../pages/basket/basket";
import { HomePage } from "../../pages/home/home";
import {QuickOrderPage} from "../../pages/quick-order/quick-order";
import {QuickOrderActionPage} from "../../pages/quick-order-action/quick-order-action";

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.html'
})
export class SideNavComponent {

  @ViewChild(Nav) nav: Nav;

  sideMenuPages: Array<{ title: string, component: any, icon: string }>;
  constructor(public navParams: NavParams,
              public navCtrl : NavController,
              public events: Events) {
    this.initSideNav();
  }

  initSideNav(): any {
    this.sideMenuPages = [
      {title: 'Home' , component: HomePage , icon: 'home'},
      {title: 'Quick Order' , component: QuickOrderPage , icon: 'book'},
      {title: 'Quick Order Action' , component: QuickOrderActionPage , icon: 'book'},
      {title: 'Menu Order' , component: MenuOrderPage , icon: 'map'},
      {title: 'Tracking' , component: TrackingPage , icon: 'pin'},
      {title: 'Wallet' , component: WalletPage , icon: 'card'},
      {title: 'Basket' , component: BasketPage , icon: 'cart'},
      {title: 'Sign-Out' , component: LoginPage , icon: 'power'}
    ];
  }

}
