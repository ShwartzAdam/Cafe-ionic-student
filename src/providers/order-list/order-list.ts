import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//modals
import {OrderList} from "../../model/orderList";

@Injectable()
export class OrderListProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello OrderListProvider Provider');
  }

  public createOrderList(_orderList: OrderList){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/orderedlists', JSON.stringify(_orderList), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getOrderListById(id : number): Observable<OrderList> {
    return this.http.get<OrderList>(this.url + '/orderedlists/' + id );
  }

  // delete order list by id
  public deleteOrderlistById(id: number){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + '/orderedlists/' + id , {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public updateOrderList(_orderList: OrderList){
    return new Promise((resolve, reject) => {
      this.http.put(this.url + '/orderedlists/' , JSON.stringify(_orderList) ,{
        headers: new HttpHeaders().set("Content-Type", 'application/json')
      }).timeout(2000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
