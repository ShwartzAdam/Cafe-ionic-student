/**
 * Home component - after successfull login , this page is acting as the main page
 *  from here , you can access all other pages in the applicaion
 */
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BasketPage } from "../basket/basket";
import { AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { Student } from "../../model/user";
import { UserData } from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  private isEntered: boolean = false;
  private userid: number;
  public _student: Student = new Student;
  private countItems: number;
  constructor(public navCtrl: NavController,
              public userProvider: UserProvider,
              public userData: UserData,
              public alertCtrl: AlertController) {
    this.initView();
  }

  private initView(): void {
    if( !this.isEntered ) {
      this.userData.getUserId().then(
        res => {
          this.userid = res;
          // Setting the token value to service
          //  this.userProvider.setToken();
          // Get student info for html template
          this.userProvider.getUserById(this.userid).subscribe(
            res => {
              // Save the student info in user data service
              this.userData.setStudent(res);
              this._student = res;
            });
          // Check user balance
          this.userProvider.getUserCreditBalance(this.userid).then((result) => {
            if( result['credit'] == 0) {
              this.presentAlert();
            }
          }, (err) => {
          });
        });
      this.isEntered = true;
    }
    // Get the items in cart
    this.userData.getItemsFromCart().then(
      res => {
        if(res){
          this.countItems = res.length;
        }
      }
    );

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hello Student !',
      subTitle: 'We noticed you credit is 0 ,Please enter the profile section and click on the Wallet segment before making any purchase in the application, Thank you AA',
      buttons: ['Got it...']
    });
    alert.present();
  }

  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
