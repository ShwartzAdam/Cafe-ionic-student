import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {Review} from "../../model/review";
import {UserData} from "../user-data/user-data";

@Injectable()
export class ReviewProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  private http: HttpClient;
  private userData:UserData;
  constructor() {
    // this.setToken();
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
  // Create revivew
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
  // Get all reviews
  public getAllReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews' , { headers: this.headerConfig
    });
  }
  // Get a review by id
  public getReviewById(id : number): Observable<Review> {
    return this.http.get<Review>(this.url + '/reviews/' + id , { headers: this.headerConfig
    });
  }
  // Get all review by item id
  public getReviewByItemId(id : number): Observable<Review[]> {
    return this.http.get<Review[]>(this.url + '/reviews/item/' + id , { headers: this.headerConfig
    } );
  }
  // Update review
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
  // get honest review
  public getReviewByItem(id: number){
    return new Promise((resolve, reject) => {
      this.http.get(this.url+'/reviews/item/gethonestreviews/' + id, { headers: this.headerConfig
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }



}
