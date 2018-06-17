import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Item} from "../../model/item";


@Injectable()
export class ItemProvider {
  url = 'https://cafeappserver.herokuapp.com/api';

  constructor(public http: HttpClient) {

  }
  /*
 public getAllItem(){
   return new Promise(resolve => {
     this.http.get(this.url + "/items").subscribe(data => {
       resolve(data);
     }, err => {
       console.log(err);
     });
   });
 }
*/
  public getAllItemByType(type){
   return new Promise(resolve => {
     this.http.get(this.url + "/items/type/" + type).subscribe(data => {
       resolve(data);
     }, err => {
       console.log(err);
     });
   });
 }

  public getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + '/items' );
  }
  public getItemById(id): Observable<Item> {
    return this.http.get<Item>(this.url + '/items/' + id );
  }

}
