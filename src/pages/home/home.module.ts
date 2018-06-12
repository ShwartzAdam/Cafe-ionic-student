import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {FooterNavComponent} from "../../components/footer-nav/footer-nav";


@NgModule({
  declarations: [
    HomePage,
    FooterNavComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
