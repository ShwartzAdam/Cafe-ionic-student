import { Component } from '@angular/core';
import {NavController, IonicPage, LoadingController} from 'ionic-angular';
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

  constructor(public nav: NavController,
              public userProvider: UserProvider,
              public userData: UserData,
              public loadingCtrl: LoadingController) {
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
            this.nav.setRoot("HomePage");
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 3000);

        } else{
            console.log("bad input for loggin");
        }

    });

  }




}
