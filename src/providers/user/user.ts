import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Student, User} from "../../model/user";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public createUser(_user: Student){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/users/signup', JSON.stringify(_user), {
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

  public getUser(registerCredentials) {
    return new Promise(resolve => {
      this.http.post(this.url+'/users/login', JSON.stringify(registerCredentials), {
        headers: new HttpHeaders().set("Content-Type", 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        });
    });
  }

  public getUserByEmail(email : string) :Observable<Student>{
    return this.http.get<Student>(this.url + '/users/' + email );
  }

  public getUserById(id : number) :Observable<Student>{
    return this.http.get<Student>(this.url + '/users/' + id );
  }


  public updateUser(_user: User){

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
    };

    const req = new HttpRequest('POST', this.url + "/upload/users/", formData, options);
    return this.http.request(req);
  }

  public getFile(file: String) :Observable<HttpEvent<any>>{
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('GET', this.url + "/download/" + file, options);
    return this.http.request(req);
  }

  public getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(this.url + "/download/" + imageUrl , {responseType: "blob"});
  }

}
