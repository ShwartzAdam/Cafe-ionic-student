import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-quick-order-action',
  templateUrl: 'quick-order-action.html',
})
export class QuickOrderActionPage implements OnInit{
  public rootComponent = 'Information';
  private displayReview: boolean = false;
  private displayInfo: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              ) {
  }
  ngOnInit(): void {
      if(this.rootComponent == 'Information') {
        this.selectedInformation();
      } else {
        this.selectedReview();
      }
  }


  selectedReview() {
    this.displayReview = true;
    this.displayInfo = false;
  }

  selectedInformation() {
    this.displayReview = false;
    this.displayInfo = true;
  }
}
