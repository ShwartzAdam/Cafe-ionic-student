import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// main App
import { MyApp } from './app.component';
// pages
import { HomePage } from "../pages/home/home";
import { LoginPage } from '../pages/login/login';
import { QuickOrderPage } from '../pages/quick-order/quick-order';
import { MenuOrderPage } from '../pages/menu-order/menu-order';
import {PasswordResetPage} from "../components/password/password";
import {ProfilePage} from "../pages/profile/profile";
// components
import { ItemComponent } from '../components/item/item';
import { QuickOrderTicket } from "../pages/quick-order/quick-order-ticket";
import { ItemMenuComponent }  from "../components/item-menu/item-menu";
import { ItemBasketComponent } from "../components/item-basket/item-basket";
import { SideNavComponent } from "../components/side-nav/side-nav";
import { UserComponent } from "../components/user/user";
import { ReviewComponent } from "../components/review/review";
import { ReviewItemComponent } from "../components/review-item/review-item";
import { InfoOrderComponent } from "../components/info-order/info-order";
import { InfoOrderDetailsComponent } from "../components/info-order-details/info-order-details";
import { AccordionListComponent } from "../components/accordion-list/accordion-list";
import { DrinkQuickComponent } from "../components/quick/drink-quick/drink-quick";
import { SnackQuickComponent } from "../components/quick/snack-quick/snack-quick";
import { SandQuickComponent } from "../components/quick/sand-quick/sand-quick";
import { CorDrinkQuickComponent } from "../components/quick/cor-drink-quick/cor-drink-quick";
import { InfoItemComponent } from "../components/info-item/info-item";
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
import { BasketPageModule } from "../pages/basket/basket.module";
import { ImagePreloader } from "../directives/img-preload/img-preload";
import { Ionic2RatingModule } from "ionic2-rating";
import { CapitalizeFirstPipe } from "../pipes/capitalize-first/capitalize-first";
import { Timer } from "../components/countdown-timer/timer";
import { NativePageTransitions } from "@ionic-native/native-page-transitions";




@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    QuickOrderPage,
    QuickOrderTicket,
    MenuOrderPage,
    ItemComponent,
    ReviewComponent,
    ReviewItemComponent,
    SideNavComponent,
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
    Timer,
    UserComponent,
    PasswordResetPage,
    ItemMenuComponent,
    ItemBasketComponent
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
    BasketPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    QuickOrderPage,
    QuickOrderTicket,
    MenuOrderPage,
    ItemComponent,
    ReviewComponent,
    ReviewItemComponent,
    SideNavComponent,
    DrinkQuickComponent,
    CorDrinkQuickComponent,
    SnackQuickComponent,
    SandQuickComponent,
    InfoItemComponent,
    InfoOrderComponent,
    InfoOrderDetailsComponent,
    AccordionListComponent,
    ProfilePage,
    Timer,
    UserComponent,
    PasswordResetPage,
    ItemMenuComponent,
    ItemBasketComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ItemProvider,
    OrderProvider,
    OrderListProvider,
    ReviewProvider,
    ReviewListProvider,
    UserData,
    NativePageTransitions,
  ]
})
export class AppModule {}
