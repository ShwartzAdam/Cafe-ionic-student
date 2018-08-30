/**
 * Password compoent - in profile page , you can reset your
 * password with the key icon
 */
import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {UserData} from "../../providers/user-data/user-data";

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'password.html',
})
export class PasswordResetPage {

  // connection to UI
  public userPassword = {
    oldPass : "" ,
    newPassFirst: "" ,
    newPassSec: ""
  };
  // post to server
  private userJson = {
    userid : 0,
    oldpassword : "",
    newpassword : ""
  };
   imageFileName: any = "../../assets/png/littlecafe.png";

  constructor(private navCtrl: NavController,
              private userPr: UserProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public userData: UserData) {
    this.initData();
  }
  private initData() {
    this.userData.getUserId().then(
      user => {
        // if succeed -> save in userJson
        this.userJson.userid = user;
      }).catch(() => {

    })
  }

  public passwordReset(){
    // save user in Class
    console.log(this.userPassword);
    if(this.userPassword.newPassFirst === this.userPassword.newPassSec ){
      this.userJson.oldpassword = this.userPassword.oldPass;
      this.userJson.newpassword = this.userPassword.newPassFirst;
      this.userPr.forgotPassword(this.userJson).then((result) => {
        if(result){
          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Successfully changed your password, and sent to your private email'
          });
          loading.present();

          setTimeout(() => {
            this.navCtrl.pop();
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 5000);

        }
      }, () => {
      });
    } else {
      // present error
      this.presentAlert('F');
    }

  }
  presentAlert(s) {
    if( s == 'F') {
      let alert = this.alertCtrl.create({
        title: 'Error - Password!',
        subTitle: 'Please type your password again',
        buttons: ['Got it...']
      });
      alert.present();
    }

  }


}
