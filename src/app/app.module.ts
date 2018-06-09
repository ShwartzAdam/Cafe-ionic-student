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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { TrackingPageModule } from "../pages/tracking/tracking.module";
import { BasketPageModule } from "../pages/basket/basket.module";
import { WalletPageModule } from "../pages/wallet/wallet.module";
import { LoggerProvider } from '../providers/logger/logger';
import {SideNavComponent} from "../components/side-nav/side-nav";
import {BasketTicket} from "../pages/basket/basket-ticket";
import {ImagePreloader} from "../directives/img-preload/img-preload";
import {ReviewComponent} from "../components/review/review";
import {ReviewItemComponent} from "../components/review-item/review-item";
import {Ionic2RatingModule} from "ionic2-rating";
import {QuickOrderActionPage} from "../pages/quick-order-action/quick-order-action";
import {DrinkQuickComponent} from "../components/quick/drink-quick/drink-quick";
import {SnackQuickComponent} from "../components/quick/snack-quick/snack-quick";
import {SandQuickComponent} from "../components/quick/sand-quick/sand-quick";
import {CorDrinkQuickComponent} from "../components/quick/cor-drink-quick/cor-drink-quick";
import {InfoItemComponent} from "../components/info-item/info-item";
import {ProfilePage} from "../pages/profile/profile";
import {InfoOrderComponent} from "../components/info-order/info-order";
import {InfoOrderDetailsComponent} from "../components/info-order-details/info-order-details";
import {AccordionListComponent} from "../components/accordion-list/accordion-list";
import {CapitalizeFirstPipe} from "../pipes/capitalize-first/capitalize-first";
import {Time} from "@angular/common";
import {Timer} from "../components/countdown-timer/timer";


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    QuickOrderActionPage,
    QuickOrderPage,
    QuickOrderTicket,
    MenuOrderPage,
    MenuOrderDetails,
    ItemComponent,
    ReviewComponent,
    ReviewItemComponent,
    SideNavComponent,
    BasketTicket,
    ImagePreloader,
    DrinkQuickComponent,
    CorDrinkQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,
    InfoItemComponent,
    InfoOrderComponent,
    InfoOrderDetailsComponent,
    AccordionListComponent,
    ProfilePage,
    CapitalizeFirstPipe,
    Timer
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginPageModule,
    HomePageModule,
    TrackingPageModule,
    BasketPageModule,
    WalletPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    QuickOrderActionPage,
    QuickOrderPage,
    QuickOrderTicket,
    MenuOrderPage,
    MenuOrderDetails,
    ItemComponent,
    ReviewComponent,
    ReviewItemComponent,
    SideNavComponent,
    BasketTicket,
    DrinkQuickComponent,
    CorDrinkQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,
    InfoItemComponent,
    InfoOrderComponent,
    InfoOrderDetailsComponent,
    AccordionListComponent,
    ProfilePage,
    Timer
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
