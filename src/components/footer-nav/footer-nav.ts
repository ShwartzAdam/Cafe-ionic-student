import { Component } from '@angular/core';
import {NavParams, NavController, Events} from "ionic-angular";
import {QuickOrderPage} from "../../pages/quick-order/quick-order";
import {MenuOrderPage} from "../../pages/menu-order/menu-order";
import {WalletPage} from "../../pages/wallet/wallet";
import {LoginPage} from "../../pages/login/login";
import {TrackingPage} from "../../pages/tracking/tracking";

@Component({
  selector: 'app-footer-nav',
  templateUrl: 'footer-nav.html'
})
export class FooterNavComponent {
  footerMenu: any;

  constructor(public navParams: NavParams,
              public navContrl : NavController,
              public events: Events) {
    this.initFooterNav();
  }

  initFooterNav(): any {
    this.footerMenu = [
      {title: 'Quick' , component: QuickOrderPage , icon: 'book'},
      {title: 'Menu' , component: MenuOrderPage , icon: 'map'},
      {title: 'Tracking' , component: TrackingPage , icon: 'pin'},
      {title: 'Wallet' , component: WalletPage , icon: 'card'},
      {title: 'Sign-Out' , component: LoginPage , icon: 'power'}
    ];
  }
  openPage(page): void {
    this.navContrl.setRoot(page.component);
  }

}
