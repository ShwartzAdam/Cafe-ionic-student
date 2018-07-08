import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {ReviewList} from "../../model/reviewList";

@Injectable()
export class ReviewListProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  constructor(private http: HttpClient) {
    //this.setToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
  /*
  setToken(){
    console.log('Review List Provider - Setting Access Token');
    this.userData.getToken().then(
      res => {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('x-access-token', res);
        this.headerConfig = headers;
        console.log(this.headerConfig);
      });
  }
  */
  // CREATE REVIEW LIST
  public createReviewList(_reviewList: ReviewList){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/reviewlists' , JSON.stringify(_reviewList),
        { headers: this.headerConfig
        }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // GET ALL REVIEW LIST
  public getAllReviewList(): Observable<ReviewList[]> {
    return this.http.get<ReviewList[]>(this.url + '/reviewlists' , { headers: this.headerConfig
    });
  }
  // GET  REVIEW LIST BY ID
  public getReviewListById(id : number): Observable<ReviewList> {
    return this.http.get<ReviewList>(this.url + '/reviewlists/' + id, { headers: this.headerConfig
    } );
  }
  // UPDATE REVIEW LIST
  public updateReviewList(_reviewList: ReviewList){
    return new Promise((resolve, reject) => {
      this.http.put(this.url+'/reviewlists', JSON.stringify(_reviewList), { headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // GET ITEM REVIEW FOR USERS
  public getItemRevUser(userid: number, orderlistid: number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/reviewlists/' + userid + '/' + orderlistid ,{ headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
