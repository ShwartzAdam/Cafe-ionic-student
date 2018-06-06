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

  userid: number;
  _student: Student = new Student;
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
    //saving in local storage
    this.userData.getUserId().then(
      res => {
        this.userid = res;
        this.display();
        this.userData.getItemsFromCart().then(
          res => {
            if(res){
              this.countItems = res.length;
            }
          }
        );
      });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hello Student !',
      subTitle: 'We noticed you credit is 0 ,Please click on Wallet before making any purchase, Thank you AA',
      buttons: ['Got it...']
    });
    alert.present();
  }

  private display(){
    this.userProvider.getUserById(this.userid).subscribe((res: Student)=> {
      this._student = res;
      this.userData.setStudent(this._student);
      if(this._student.credit == 0){
        console.log('student has no credit at all');
        this.presentAlert();

      }
    });

  }
  // will shut off logged boolean and turn to false
  // when the user log in successfuly we turn a boolean var so we could limit one user for access

  // public so you can reach here from every corner in the app while you logged
  public gotoBasket(){
    this.navCtrl.setRoot(BasketPage);
  }

}
