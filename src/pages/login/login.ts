import { Component } from '@angular/core';
import {NavController, IonicPage, LoadingController, AlertController} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
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
              public alertCtrl: AlertController,
              private nativePageTransitions: NativePageTransitions) {
    this.userData.cleanCart();
    this.userData.clearStudent();
  }


  callback = data => {
    this.dataFromOtherPage = data;
    this.registerCredentials.email = data['email'];
    this.registerCredentials.password = data['password'];
    console.log('data received from other page', this.dataFromOtherPage);
  };

  createAccount() {
    this.nav.push('RegisterPage',{
      callback: this.callback
    });
  }

  forgotAccount(){
    this.nav.push('ForgotpassPage');
  }


  login() {
    console.log(this.registerCredentials);
    this.userProvider.getUser(this.registerCredentials).then( result => {
        if(result){
          console.log('Log In Successful, UID: ' + result["userid"] );
          this.userData.setUserId(result["userid"]);

          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Please Wait...'
          });
          loading.present();
          setTimeout(() => {
            this.options = {
              direction: 'up',
              duration: 500,
              slowdownfactor: 3,
              slidePixels: 20,
              iosdelay: 100,
              androiddelay: 150,
              fixedPixelsTop: 0,
              fixedPixelsBottom: 60
            };
            this.nativePageTransitions.flip(this.options);
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
