/**
 * Main Application
 *
 */
import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
// pages
import { QuickOrderPage } from '../pages/quick-order/quick-order';
import { MenuOrderPage } from '../pages/menu-order/menu-order';
import { LoginPage } from "../pages/login/login";
import { BasketPage } from "../pages/basket/basket";
import { HomePage } from "../pages/home/home";
import { ProfilePage } from "../pages/profile/profile";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // nav global
  @ViewChild(Nav) nav: Nav;
  // root page
  rootPage: any = LoginPage;
  // side menu pages
  sideMenuPages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform,
              public menuCtrl: MenuController){
    this.initializeApp();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menu-right');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'menu-right');
  }

  initializeApp() {
    // side menu pages
    this.sideMenuPages = [
      {title: 'Profile' , component: ProfilePage , icon: 'person'},
      {title: 'Home' , component: HomePage , icon: 'home'},
      {title: 'Quick Order' , component: QuickOrderPage , icon: 'book'},
      {title: 'Menu Order' , component: MenuOrderPage , icon: 'map'},
      {title: 'Basket' , component: BasketPage , icon: 'cart'},
      {title: 'Sign-Out' , component: LoginPage , icon: 'power'}
    ];
    this.platform.ready().then(() => {
    });
  }

  openPage(sideMenuPages) {
    this.nav.setRoot(sideMenuPages.component);
  }

}
