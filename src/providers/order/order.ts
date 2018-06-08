import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//models
import {Order} from "../../model/order";

@Injectable()
export class OrderProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {}

  public createOrder(_order: Order){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/ordereditems', JSON.stringify(_order), {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      }).timeout(2000)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getOrderById(id : number): Observable<Order> {
    return this.http.get<Order>(this.url + '/ordereditems/' + id );
  }

  // delete order list by id
  public deleteOrderById(id: number){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + '/ordereditems/' + id , {
        headers: new HttpHeaders().set("Content-Type", 'application/json'),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getOrdersByOrderListId(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/ordereditems/olid/' + id , {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getOrdersByOrderListIdSuc(id: number) : Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/ordereditems/olid/' + id );

  }

}
