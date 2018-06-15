import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// pages
import { QuickOrderPage } from '../pages/quick-order/quick-order';
import { MenuOrderPage } from '../pages/menu-order/menu-order';
import { LoginPage } from "../pages/login/login";
import { BasketPage } from "../pages/basket/basket";
import { HomePage } from "../pages/home/home";
import {ProfilePage} from "../pages/profile/profile";
// provider

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // userLoggedIn: boolean = false;
  rootPage: any = LoginPage;
  sideMenuPages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
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
    /*
    if(this.oauthService.hasValidIdToken()){
      this.rootPage = HomePage;
    } else{
      this.rootPage = LoginPage;
    }
    */
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(sideMenuPages) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(sideMenuPages.component);
  }

}
