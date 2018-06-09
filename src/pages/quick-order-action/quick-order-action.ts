import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Timer} from "../../components/countdown-timer/timer";


@IonicPage()
@Component({
  selector: 'page-quick-order-action',
  templateUrl: 'quick-order-action.html',
})
export class QuickOrderActionPage{

  @ViewChild(Timer) child : Timer;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
    this.child.startTimer();
  }
  public onChange(e){
    console.log(e);
  }

}
