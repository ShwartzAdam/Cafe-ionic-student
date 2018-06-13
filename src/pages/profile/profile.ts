import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserData} from "../../providers/user-data/user-data";
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";
import {OrderListProvider} from "../../providers/order-list/order-list";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ngOnInit(): void {
    // root segment
    this.selectedSeg('O');

    this.userData.getUserId().then(
      res => {
        this.userId = res;
        this.userPro.getUserById(this.userId).subscribe(
          res => {
            this.stu = res;
            this.userUrl = "../../assets/" + this.stu.url;
            console.log(this.stu);
          });
        this.orderListPro.getOrderListByUserId(this.userId).subscribe(
          res => {
            console.log(res);
           const incoming = res.filter(order => (order.status === 'Incoming' || order.status === 'Active'));
           this.data.openOrder = incoming.length;
           console.log(incoming);
           const done = res.filter(order => order.status === 'Complete');
           this.data.closeOrder = done.length;
           console.log(done);

          })
      });
  }
  selectedSeg(s){
    if( s == 'C'){
      // COMPLETE ORDERS
      this.displayComplete = true;
      this.displayCredit = false;
      this.displayOpen = false;
    } else if ( s == 'O') {
      this.displayOpen = true;
      this.displayCredit = false;
      this.displayComplete = false;
    } else if ( s == 'CT' ) {
      this.displayCredit = true;
      this.displayOpen = false;
      this.displayComplete = false;
    } else {
      console.log('bad input when switch');
    }
  }

  addCredit(): void {
    this.stu.credit = this.stu.credit + 100;
    console.log(this.stu);
    // needs to have put call to update only one col
    this.userPro.updateUser(this.stu).then(
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
