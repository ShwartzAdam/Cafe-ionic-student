import { Component } from '@angular/core';
import {NavController, IonicPage, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {UserData} from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = { email: '', password: '' };

  constructor(public nav: NavController,
              public userProvider: UserProvider,
              public userData: UserData) {
    this.userData.cleanCart();
    this.userData.clearStudent();
  }

  createAccount() {
    this.nav.push('RegisterPage');
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
          this.nav.setRoot("HomePage");
        } else{
            console.log("bad input for loggin");
        }

    });

  }

}
