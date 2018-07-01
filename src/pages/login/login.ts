import { Component } from '@angular/core';
import {NavController, IonicPage, LoadingController, AlertController} from 'ionic-angular';
import { NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import {UserProvider} from "../../providers/user/user";
import {UserData} from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = { email: '', password: '', role: 'Student' };
  dataFromOtherPage = null;
  imageFileName: any = "../../assets/png/littlecafe.png";
  options:NativeTransitionOptions;
  constructor(public nav: NavController,
              public userProvider: UserProvider,
              public userData: UserData,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
    // WHEN LOGGING - DELETE CART AND STUDNET INFO
    this.userData.cleanCart();
    this.userData.clearStudent();
  }

  // CALL BACK FROM REGISTER PAGE WITH EMAIL AND PASSWORD
  callback = data => {
    this.dataFromOtherPage = data;
    this.registerCredentials.email = data['email'];
    this.registerCredentials.password = data['password'];
    console.log('data received from other page', this.dataFromOtherPage);
  };

  // GO TO RGISTER PAGE
  createAccount() {
    this.nav.push('RegisterPage',{
      callback: this.callback
    });
  }
  // GO TO FORGET PASSWORD PAGE
  forgotAccount(){
    this.nav.push('ForgotpassPage');
  }

  // LOGIN FUNCTION
  login() {
    // show the login vars - user,pass,role
    console.log(this.registerCredentials);
    this.userProvider.login(this.registerCredentials).then( result => {
        if(result){
          console.log('Log In Successful, UID: ' + result["userid"] );
          // SAVE USER ID AND TOKEN AT USER DATA SERVICE
          this.userData.setUserId(result["userid"]);
          this.userData.setToken(result["token"]);
          this.us
          // LOADING CONTROL
          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Please Wait...'
          });
          loading.present();
          setTimeout(() => {
            this.options = {
              direction: 'up',
              duration: 500
            };
            this.nav.setRoot("HomePage");
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 3000);

        } else{
            console.log("bad input for loggin");
        }

    }).catch( err => {
         this.presentAlert();
    });

  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error Login!',
      subTitle: 'Please insert your email and password again',
      buttons: ['Got it...']
    });
    alert.present();
  }




}
