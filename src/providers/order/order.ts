/**
 * Order provider - api calls to web service
 *
 */
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
import {Order} from "../../model/order";

@Injectable()
export class OrderProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  private http: HttpClient;
  constructor() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
  // Create order
  public createOrder(_order: Order){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/ordereditems', JSON.stringify(_order), { headers: this.headerConfig
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // Get order by id
  public getOrderById(id : number): Observable<Order> {
    return this.http.get<Order>(this.url + '/ordereditems/' + id , { headers: this.headerConfig
    });
  }

  // Delete order by id
  public deleteOrderById(id: number){
    return new Promise((resolve, reject) => {
      this.http.delete(this.url + '/ordereditems/' + id , { headers: this.headerConfig
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // Get all orders by orderlist id
  public getOrdersByOrderListId(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/ordereditems/olid/' + id , { headers: this.headerConfig
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // Get order by orderlist id
  public getOrdersByOrderListIdSuc(id: number) : Observable<Order[]> {
    return this.http.get<Order[]>(this.url + '/ordereditems/olid/' + id , { headers: this.headerConfig
    } );

  }

}
