import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickOrderPage } from './quick-order';
import { QuickOrderTicket } from './quick-order-ticket';

@NgModule({
  declarations: [
    QuickOrderPage,
    QuickOrderTicket
  ],
  imports: [
    IonicPageModule.forChild(QuickOrderPage),
  ],
})
export class QuickOrderPageModule {}
