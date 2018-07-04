import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MenuOrderPage} from './menu-order';

@NgModule({
  declarations: [
    MenuOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuOrderPage),
  ],
})
export class LoginPageModule {}
