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
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(sideMenuPages.component);
  }

}
