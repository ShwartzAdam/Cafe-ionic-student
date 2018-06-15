import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-quick-order-action',
  templateUrl: 'quick-order-action.html',
})
export class QuickOrderActionPage{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {}


  doConfirm() {
    const alert = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });

    alert.present();
  }

}
