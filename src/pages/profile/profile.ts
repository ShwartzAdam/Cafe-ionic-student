import {Component, OnInit, ViewChild} from '@angular/core';
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
    // ROOT SEGEMNTS OPEN ORDERS
    this.selectedSeg('O');
    // GET USER DATA FOR TEMPLATE
    this.userData.getUserId().then(
      res => {
        this.userId = res;
        this.userPro.getUserById(this.userId).subscribe(
          res => {
            this.stu = res;
            this.userUrl = "../../assets/" + this.stu.url;
          });
        // GET ALL ORDERS BY USER ID FOR PROFILE PAGE
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
      // COMPLETE ORDERS
      this.displayComplete = true;
      this.displayCredit = false;
      this.displayOpen = false;
    } else if ( s == 'O') {
      // OPEN ORDERS
      this.displayOpen = true;
      this.displayCredit = false;
      this.displayComplete = false;
    } else if ( s == 'CT' ) {
      // CREDIT SEGMENT
      this.displayCredit = true;
      this.displayOpen = false;
      this.displayComplete = false;
    } else {
      console.log('bad input when switch');
    }
    // SCROLL DOWN
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  addCredit(): void {
    // GET USER CREDIT
    this.userPro.getUserCreditBalance(this.userId).then(
      res => {
        // ADD 100 TO HIS ACCOUNTS CREDIT
        let addition: number = res['credit'];
        addition = addition + 100;
        let jsonCredit = {
          'userid' : this.userId,
          'credit' : addition
        };
        this.userPro.setUserCreditBalance(jsonCredit).then(
          res => {
            console.log(res);
            // PRESENT TOAST
            this.presentToast();
            // UPDATE DISPLAY
            this.stu.credit = addition;
        })

      }
    );
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
