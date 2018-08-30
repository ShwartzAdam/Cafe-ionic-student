/**
 * login component - let user login with email and password, can also access
 * forgot password or register views
 */
import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { UserProvider } from "../../providers/user/user";
import { UserData } from "../../providers/user-data/user-data";

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
    // When logging - delete cart and studnet info
    this.userData.cleanCart();
    this.userData.clearStudent();
  }

  // Call back from register page with email and password
  callback = data => {
    this.dataFromOtherPage = data;
    this.registerCredentials.email = data['email'];
    this.registerCredentials.password = data['password'];
  };

  //  Go to register page
  createAccount() {
    this.nav.push('RegisterPage',{
      callback: this.callback
    });
  }
  // Go to forget password page
  forgotAccount(){
    this.nav.push('ForgotpassPage');
  }

  login() {
    // Show the login vars - user,pass,role
    this.userProvider.login(this.registerCredentials).then( result => {
        if(result){
          // Save user id and token at user data service
          this.userData.setUserId(result["userid"]);
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
