import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingPage } from './tracking';
import {IonicStepperModule} from "ionic-stepper";

@NgModule({
  declarations: [
    TrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingPage),
    IonicStepperModule,
  ],
})
export class TrackingPageModule {}
