import {Component, ViewChild} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Student} from "../../model/user";

import {HttpEventType, HttpResponse} from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  _userRegister: Student = new Student;
  _passRepeat: string;

  imageFileUpload: any;
  imageFileName: any = "../../assets/png/avatar.png";
  @ViewChild('selectedFile') selectedFileEl;


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private userPr: UserProvider,
              private sanitizer: DomSanitizer,
              public loadingCtrl: LoadingController){
    this._userRegister.role = "Student";
  }

  public register(){
    console.log(this._userRegister);
    // save user in Class
    if(this._userRegister){
      this.userPr.createUser(this._userRegister).then((result) => {
        console.log(result);
        if(result){
          console.log("Succesfuly created new user" + result);

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
        console.log(err);
      });
    }

  }


  public selectFile(event) {
    console.log(event.target.files);
    this.uploadFile(event.target.files);
  }

  public uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];
    this.imageFileUpload = file.name;
    console.log(this.imageFileUpload);
    //this._userRegister.image = file.name;
    this.userPr.uploadFile(file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);

        }, () => {
          console.log("Upload done");
          // bind user with img and set an icon the show the file uploaded
          // also update their avatrar logo
        }
      )
  }

  public downloadFile(file: string){
    this.userPr.getFile(file)
      .subscribe(
        event => {
          console.log(event);
          //this.imageFileName =
        },
        (err) => {
          console.log("Upload Error:", err);
          // error
        }, () => {
          console.log("Upload done");
          // bind user with img and set an icon the show the file uploaded
          // also update their avatrar logo
        }
      )
  }

  public getImageFromService(file: string) {
    this.userPr.getImage(file).subscribe(data => {
      console.log(data);
      let file = new File([data], this.imageFileUpload);
      console.log(file);
      let urlCreator = window.URL;
      this.imageFileName = this.sanitizer.bypassSecurityTrustUrl(
      urlCreator.createObjectURL(file));

    }, error => {
      console.log(error);
    });
  }



}
