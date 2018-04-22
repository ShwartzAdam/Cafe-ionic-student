import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// main App
import { MyApp } from './app.component';
// pages
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { QuickOrderPage } from '../pages/quick-order/quick-order';
import { MenuOrderPage } from '../pages/menu-order/menu-order';
// components
import { QuickOrderDetails } from '../pages/quick-order/quick-order-details';
import { MenuOrderDetails } from '../pages/menu-order/menu-order-details';
import { ItemComponent } from '../components/item/item';
import { QuickOrderTicket } from "../pages/quick-order/quick-order-ticket";
// services
import { UserProvider } from '../providers/user/user';
import { ItemProvider } from '../providers/item/item';
import { OrderProvider } from '../providers/order/order';
import { OrderListProvider } from '../providers/order-list/order-list';
import { ReviewProvider } from '../providers/review/review';
import { ReviewListProvider } from '../providers/review-list/review-list';
import { UserData } from '../providers/user-data/user-data';
// modules
import { HomePageModule } from "../pages/home/home.module";
import { LoginPageModule } from "../pages/login/login.module";
import { IonicStepperModule } from "ionic-stepper";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { TrackingPageModule } from "../pages/tracking/tracking.module";
import { BasketPageModule } from "../pages/basket/basket.module";
import { WalletPageModule } from "../pages/wallet/wallet.module";
import { LoggerProvider } from '../providers/logger/logger';
import {SideNavComponent} from "../components/side-nav/side-nav";
import {BasketTicket} from "../pages/basket/basket-ticket";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    QuickOrderPage,
    QuickOrderDetails,
    QuickOrderTicket,
    MenuOrderPage,
    MenuOrderDetails,
    ItemComponent,
    SideNavComponent,
    BasketTicket
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    LoginPageModule,
    HomePageModule,
    TrackingPageModule,
    BasketPageModule,
    WalletPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    QuickOrderPage,
    QuickOrderDetails,
    QuickOrderTicket,
    MenuOrderPage,
    MenuOrderDetails,
    ItemComponent,
    SideNavComponent,
    BasketTicket
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ItemProvider,
    OrderProvider,
    OrderListProvider,
    ReviewProvider,
    ReviewListProvider,
    UserData,
    LoggerProvider,
  ]
})
export class AppModule {}
