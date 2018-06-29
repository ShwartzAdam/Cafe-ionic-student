import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Student, User} from "../../model/user";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserData} from "../user-data/user-data";


@Injectable()
export class UserProvider {
  public urlProd = 'https://cafeappserver.herokuapp.com/api';
  public urlDev = 'http://localhost:3000/api';
  public headerConfig: any;
  constructor(private http: HttpClient,
              private userData:UserData) {
    this.setToken();
  }

  setToken(){
    console.log('User Provider - Setting Access Token');
    this.userData.getToken().then(
      res => {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('x-access-token', res);
        this.headerConfig = headers;
        console.log(this.headerConfig);
      });
  }

  // create user in the db - signup
  public signup(_user: Student){
    return new Promise((resolve, reject) => {
      this.http.post(this.urlDev+ '/signup ', JSON.stringify(_user), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
        responseType: 'text'
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // login user
  public login(registerCredentials) {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlDev+'/login', JSON.stringify(registerCredentials), {
        headers: new HttpHeaders().set("Content-Type", 'application/json')
      }).timeout(1000)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
  // get user credit balance
  public getUserCreditBalance(userid: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlDev + '/users/credit/' + userid, { headers: this.headerConfig
      }).timeout(1000)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }
  // set user credit balance
  public setUserCreditBalance(userCredit) {
    return new Promise((resolve, reject) => {
      this.http.put(this.urlDev+'/users/credit', JSON.stringify(userCredit), { headers: this.headerConfig
      }).timeout(1000)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });
    });
  }

  public getUserById(id : number) :Observable<Student>{
    return this.http.get<Student>(this.urlDev + '/users/' + id ,{ headers: this.headerConfig
    });
  }

  public updateUser(_user: User){
    return new Promise((resolve, reject) => {
      this.http.put(this.urlDev + '/users/' , JSON.stringify(_user) ,{ headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public deleteUserById(_userId : number){

  }

  public uploadFile(file: File): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('File', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      headers: this.headerConfig
    };

    const req = new HttpRequest('POST', this.urlDev + "/upload/users/", formData, options);
    return this.http.request(req);
  }

  public getFile(file: String) :Observable<HttpEvent<any>>{
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('GET', this.urlDev + "/download/" + file, options);
    return this.http.request(req);
  }

  public getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(this.urlDev + "/download/" + imageUrl , {responseType: "blob" , headers: this.headerConfig});
  }

}
