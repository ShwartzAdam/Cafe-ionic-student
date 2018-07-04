import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {Review} from "../../model/review";

@Injectable()
export class ReviewProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlDev = 'http://localhost:3000/api';
  public headerConfig: any;
  constructor(private http: HttpClient) {
    //this.setToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
  /*
  setToken(){
    console.log('Review Provider - Setting Access Token');
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
  // CREATE REVIEW
  public createReview(_review: Review){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/reviews', JSON.stringify(_review), { headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // GET ALL REVIEWS
  public getAllReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews' , { headers: this.headerConfig
    });
  }
  // GET A REVIEW BY ID
  public getReviewById(id : number): Observable<Review> {
    return this.http.get<Review>(this.url + '/reviews/' + id , { headers: this.headerConfig
    });
  }
  // GET ALL REVIEW BY ITEM ID
  public getReviewByItemId(id : number): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews/item/' + id , { headers: this.headerConfig
    } );
  }
  // UPDATE REVIEW
  public updateReview(_review: Review){
    return new Promise((resolve, reject) => {
      this.http.put(this.url+'/reviews', JSON.stringify(_review), { headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



}
