import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, Events} from 'ionic-angular';
import { BasketPage } from "../basket/basket";
import { AlertController } from 'ionic-angular';
// providers
import { UserProvider } from "../../providers/user/user";
// model
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
              public navParams: NavParams,
              public userProvider: UserProvider,
              public userData: UserData,
              public events: Events,
              public alertCtrl: AlertController) {
    this.initView();
  }

  private initView(): void {
    if( !this.isEntered ) {
      this.userData.getUserId().then(
        res => {
          this.userid = res;
          // SETTING THE TOKEN VALUE TO SERVICE
          // this.userProvider.setToken();
          // GET STUDENT INFO FOR HTML TEMPLATE
          this.userProvider.getUserById(this.userid).subscribe(
            res => {
              // SAVE THE STUDENT INFO IN USER DATA SERVICE
              this.userData.setStudent(res);
              this._student = res;
            });
          // CHECK USER BALANCE
          this.userProvider.getUserCreditBalance(this.userid).then((result) => {
            if( result['credit'] == 0) {
              console.log('Student has no credit at all - please load up');
              this.presentAlert();
            }
          }, (err) => {
            console.log(err);
          });
        });
      this.isEntered = true;
    }
    // GET THE ITEMS IN CART
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
