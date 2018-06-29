import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  userEmail = { first : "" , second: "" };
  imageFileName: any = "../../assets/png/littlecafe.png";

  constructor(public navCtrl: NavController) {
  }

  forgotPass(){
    // match between the mail the post request for email sending with password.
  }

}
