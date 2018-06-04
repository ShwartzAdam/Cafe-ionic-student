import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {ReviewList} from "../../model/reviewList";

@Injectable()
export class ReviewListProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {}

  public createReviewList(_reviewList: ReviewList){
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/reviewlists' , JSON.stringify(_reviewList), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).timeout(2000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getAllReviewList(): Observable<ReviewList[]> {
    return this.http.get<ReviewList[]>(this.url + '/reviewlists');
  }

  public getReviewListById(id : number): Observable<ReviewList> {
    return this.http.get<ReviewList>(this.url + '/reviewlists/' + id );
  }

  public updateReviewList(_reviewList: ReviewList){
    return new Promise((resolve, reject) => {
      this.http.put(this.url+'/reviewlists', JSON.stringify(_reviewList), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getItemRevUser(userid: number, orderlistid: number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/reviewlists/' + userid + '/' + orderlistid ,{
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
