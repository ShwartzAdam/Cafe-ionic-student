/**
 * Footer nav component - display 3 nav option on Home page
 *
 */
import { Component } from '@angular/core';
import {NavParams, NavController, Events} from "ionic-angular";
import {QuickOrderPage} from "../../pages/quick-order/quick-order";
import {MenuOrderPage} from "../../pages/menu-order/menu-order";
import {LoginPage} from "../../pages/login/login";

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
      {title: 'Quick Order' , component: QuickOrderPage , icon: 'book'},
      {title: 'Menu Order' , component: MenuOrderPage , icon: 'map'},
      {title: 'Sign-Out' , component: LoginPage , icon: 'power'}
    ];
  }
  openPage(page): void {
    this.navContrl.setRoot(page.component);
  }

}
