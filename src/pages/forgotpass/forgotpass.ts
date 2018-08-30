/**
 * Forgot password component - use email for a password reset
 *
 */
import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  userEmail = { first : "" , second: "" };
  userJson = { email : ""};
  imageFileName: any = "../../assets/png/littlecafe.png";

  constructor(private navCtrl: NavController,
              private userPr: UserProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {}

  public forgotPassword(){
    // If email is equal
    if(this.userEmail.first === this.userEmail.second ){
      // Keep the first email in json and call the service
      this.userJson.email = this.userEmail.first;
      this.userPr.forgotPassword(this.userJson).then((result) => {
        if(result){
          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Succesfully changed and sent to your Email'
          });
          loading.present();

          setTimeout(() => {
            this.navCtrl.pop();
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 3000);

        }
      }, () => {});
    } else {
      // Presnet error
      this.presentAlert('F');
    }

  }
  presentAlert(s) {
    if( s == 'F') {
      let alert = this.alertCtrl.create({
        title: 'Error Input!',
        subTitle: 'Please insert your email twice',
        buttons: ['Got it...']
      });
      alert.present();
    }

  }

}
