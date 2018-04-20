import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams } from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  public student: Student;
  displayCredit: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public userProvider: UserProvider,
              private toastCtrl: ToastController) {
    this.initView();
  }

  initView(): void {
    this.userData.getUserId().then(userid => {
      this.userProvider.getUserById(userid).subscribe(
        (stu:Student) => {
              console.log(stu);
              this.student = stu;
              this.displayCredit = true;
        });
    });
  }

  addCredit(): void {
    this.student.credit = this.student.credit + 100;
    console.log(this.student);
    this.userProvider.updateUser(this.student).then(
      res => {
        console.log(res);
        this.presentToast();
      }
    )
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: '100 credit was added to your balance succesfuly!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
