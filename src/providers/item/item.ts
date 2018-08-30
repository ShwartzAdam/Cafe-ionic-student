/**
 * Item provider - api calls to web service
 *
 */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Item} from "../../model/item";

@Injectable()
export class ItemProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  private http: HttpClient;
  constructor() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
   // Get all items
   public getAllItem(){
     return new Promise(resolve => {
       this.http.get(this.url + "/items" , { headers: this.headerConfig
       }).subscribe(data => {
         resolve(data);
       }, err => {
       });
     });
   }
   // Get all items by type
    public getAllItemByType(type){
     return new Promise(resolve => {
       this.http.get(this.url + "/items/type/" + type ,{ headers: this.headerConfig
       }).subscribe(data => {
         resolve(data);
       }, err => {
       });
     });
    }
    // dec item qty by id and number
    public decItemQty(itemid :number, itemQty:number) {
      return new Promise((resolve, reject) => {
        this.http.put(this.url + "/items/deduction/" + itemid + '/' + itemQty,
          {},{headers: this.headerConfig}
        ).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
    // get item id
    public getItemById(id): Observable<Item> {
      return this.http.get<Item>(this.url + '/items/' + id ,{ headers: this.headerConfig
      });
    }

}
