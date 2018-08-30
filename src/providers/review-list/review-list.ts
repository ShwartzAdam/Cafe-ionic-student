import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {ReviewList} from "../../model/reviewList";
import {UserData} from "../user-data/user-data";

@Injectable()
export class ReviewListProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  private http: HttpClient;
  private userData:UserData;
  constructor() {
    this.setToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }

  setToken(){
    this.userData.getToken().then(
      res => {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('x-access-token', res);
        this.headerConfig = headers;
      });
  }

  // Create review list
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
  // Get all review list
  public getAllReviewList(): Observable<ReviewList[]> {
    return this.http.get<ReviewList[]>(this.url + '/reviewlists' , { headers: this.headerConfig
    });
  }
  // Get review list by id
  public getReviewListById(id : number): Observable<ReviewList> {
    return this.http.get<ReviewList>(this.url + '/reviewlists/' + id, { headers: this.headerConfig
    } );
  }
  // Update review list
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
  // Get item review for user
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
  //  Get review list for item
  public getReviewListForItem(itemid: number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/reviewlists/item/' + itemid ,{ headers: this.headerConfig
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



}
