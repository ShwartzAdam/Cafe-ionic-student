import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Item} from "../../model/item";
import {UserData} from "../user-data/user-data";


@Injectable()
export class ItemProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlDev = 'http://localhost:3000/api';
  public headerConfig: any;
  constructor(private http: HttpClient,
              private userData:UserData) {
    //this.setToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
  /*
  setToken(){
    console.log('Item Provider - Setting Access Token');
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
  // GET ALL ITEM
   public getAllItem(){
     return new Promise(resolve => {
       this.http.get(this.url + "/items" , { headers: this.headerConfig
       }).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
     });
   }
   // GET ALL ITEMS BY TYPE
    public getAllItemByType(type){
     return new Promise(resolve => {
       this.http.get(this.url + "/items/type/" + type ,{ headers: this.headerConfig
       }).subscribe(data => {
         resolve(data);
       }, err => {
         console.log(err);
       });
     });
   }
   // DEC ITEM QTY BY ITEMID
    public decItemQty(itemid :number, itemQty:number) {
      return new Promise((resolve, reject) => {
        this.http.put(this.url + "/items/deduction/" + itemid + '/' + itemQty,
          {},{headers: this.headerConfig}
        ).subscribe(res => {
            resolve(res);
            console.log(res);
          }, (err) => {
            reject(err);
            console.log(err);
          });
      });
    }
    // GET ITEM BY ID
    public getItemById(id): Observable<Item> {
      return this.http.get<Item>(this.url + '/items/' + id ,{ headers: this.headerConfig
      });
    }

}
