/**
 * Register component - allow to create new user in the system
 *
 */
import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";
import {FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('selectedFile') selectedFileEl;
  private _userRegister: Student = new Student;
  borderAttMen: string = '5px solid #fff';
  borderAttWmn: string = '0px';
  maleClicked: boolean = true;
  femaleClicked: boolean = false;
  imageFileNameMen: any = "../../assets/profile/male.png";
  imageFileNameWoman: any = "../../assets/profile/female.png";
  formGroup: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  validation_messages: any;
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userPr: UserProvider,
              //private sanitizer: DomSanitizer,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController){
    const EMAILPATTERN = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";

    this.formGroup = formBuilder.group({
        firstName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*')])
        ),
        lastName: new FormControl ('', Validators.compose([
          Validators.required ,
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*')])
        ),
        email: new FormControl ('' , Validators.compose([
          Validators.required,
          Validators.pattern(EMAILPATTERN)])
        ),
        phone: new FormControl ('' ,
          Validators.compose([Validators.required])
        ),
        password: new FormControl ('' , Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)])
        )
    });
    this.validation_messages = {
      'firstName': [
        { type: 'required', message: 'First name is required.' },
        { type: 'maxlength', message: 'First name cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your first name must contain only letters.' },
      ],
      'lastName': [
        { type: 'required', message: 'Last name is required.' },
        { type: 'maxlength', message: 'Last name cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your first name must contain only letters.' },
      ],
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Email pattern error' },
      ],
      'phone': [
        { type: 'required', message: 'Phone is required.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Minimum length of 6' },
        { type: 'maxlength', message: 'Maximum length of 12' },
      ]
  };

    this._userRegister.role = "Student";
    this._userRegister.url = "profile/male.png";
  }
  public setUrl(s){
    if(s == 'M' && !this.maleClicked) {
      // remove female att and set female to false
      this.femaleClicked = false;
      this.maleClicked = true;
      this.borderAttMen = '5px solid #fff';
      this.borderAttWmn = '0px';
      this._userRegister.url = 'profile/male.png'
    } else if ( s == 'W' && !this.femaleClicked){
      this.maleClicked = false;
      this.femaleClicked = true;
      this.borderAttWmn = '5px solid #fff';
      this.borderAttMen = '0px';
      this._userRegister.url = 'profile/female.png'

    }
  }

  public register(){
    // Save user in Class
    if(this._userRegister){
      this.userPr.signup(this._userRegister).then((result) => {
        if(result){
          let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Please Wait...'
          });
          loading.present();
          setTimeout(() => {
            this.navCtrl.pop().then(() => {
              this.navParams.get('callback')(this._userRegister);
            });
          }, 1000);

          setTimeout(() => {
            loading.dismiss();
          }, 3000);

        }
      }, (err) => {
      });
    }
  }

}
