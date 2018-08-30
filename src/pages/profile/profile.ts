// profile page - displaying completed orders , incoming orders , and charge money to account

import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";
import {OrderListProvider} from "../../providers/order-list/order-list";
import {PasswordResetPage} from "../../components/password/password";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{
  @ViewChild('content') content:any;
  private userId: number;
  private stu: Student = new Student();
  public rootComponent = 'Open';
  private displayComplete: boolean = false;
  private displayOpen: boolean = false;
  private displayCredit: boolean = false;
  private userUrl: string = null;
  data = {
    openOrder: 0,
    closeOrder: 0,
    coverImage: '../../assets/profile/cover.jpg',
    moneyButton: '../../assets/ui/buttonmoney.png'
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userData: UserData,
              public userPro: UserProvider,
              private toastCtrl: ToastController,
              public orderListPro: OrderListProvider) {
  }

  ngOnInit(): void {
    // Root segemnts open orders
    this.selectedSeg('O');
    //  Get user data for template
    this.userData.getUserId().then(
      res => {
        this.userId = res;
        this.userPro.getUserById(this.userId).subscribe(
          res => {
            this.stu = res;
            this.userUrl = "../../assets/" + this.stu.url;
          });
        // Get all orders by user id for profile page
        this.orderListPro.getOrderListByUserId(this.userId).subscribe(
          res => {
           const incoming = res.filter(order => (order.status === 'Incoming' || order.status === 'Active'));
           this.data.openOrder = incoming.length;
           const done = res.filter(order => order.status === 'Complete');
           this.data.closeOrder = done.length;

          })
      });
  }
  selectedSeg(s){
    if( s == 'C'){
      // Complete orders
      this.displayComplete = true;
      this.displayCredit = false;
      this.displayOpen = false;
    } else if ( s == 'O') {
      // Open orders
      this.displayOpen = true;
      this.displayCredit = false;
      this.displayComplete = false;
    } else if ( s == 'CT' ) {
      // credit segment
      this.displayCredit = true;
      this.displayOpen = false;
      this.displayComplete = false;
    }
    // Scroll down
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  addCredit(): void {
    // Get user credit
    this.userPro.getUserCreditBalance(this.userId).then(
      res => {
        // add 100 to his account
        let addition: number = res['credit'];
        addition = addition + 100;
        let jsonCredit = {
          'userid' : this.userId,
          'credit' : addition
        };
        this.userPro.setUserCreditBalance(jsonCredit).then(
          res => {
            this.presentToast();
            // Update display
            this.stu.credit = addition;
        })

      }
    );
  }
  passwordReset() {
    this.navCtrl.push(PasswordResetPage)
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: '100 credit was added to your balance succesfuly!',
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }

}
