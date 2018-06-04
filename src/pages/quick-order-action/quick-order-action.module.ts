import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickOrderActionPage } from './quick-order-action';

@NgModule({
  declarations: [
    QuickOrderActionPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickOrderActionPage),
  ],
})
export class QuickOrderActionPageModule {}
