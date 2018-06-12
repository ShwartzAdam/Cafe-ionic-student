import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {Review} from "../../model/review";

@Injectable()
export class ReviewProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {}

  public createReview(_review: Review){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/reviews', JSON.stringify(_review), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).timeout(2000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getAllReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews');
  }

  public getReviewById(id : number): Observable<Review> {
    return this.http.get<Review>(this.url + '/reviews/' + id );
  }
  public getReviewByItemId(id : number): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews/item/' + id );
  }

  public updateReview(_review: Review){
    return new Promise((resolve, reject) => {
      this.http.put(this.url+'/reviews', JSON.stringify(_review), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).timeout(2000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
