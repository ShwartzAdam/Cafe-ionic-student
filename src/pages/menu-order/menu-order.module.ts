import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MenuOrderPage} from './menu-order';
import {MenuOrderDetails} from "./menu-order-details";

@NgModule({
  declarations: [
    MenuOrderPage,
    MenuOrderDetails,
  ],
  imports: [
    IonicPageModule.forChild(MenuOrderPage),
  ],
})
export class LoginPageModule {}
