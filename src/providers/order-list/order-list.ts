import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//modals
import {OrderList} from "../../model/orderList";
import {UserData} from "../user-data/user-data";

@Injectable()
export class OrderListProvider {
  public url = 'https://cafeappserver.herokuapp.com/api';
  public urlEnv = 'http://localhost:3000/api';
  public headerConfig: any;
  public http: HttpClient;
  public userData: UserData;
  constructor() {
    //this.setToken();
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
  // Create order list
  public createOrderList(_orderList: OrderList){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/orderedlist', JSON.stringify(_orderList), {
        headers: this.headerConfig,
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  // Check time slot for pending order list
  public checkTimeOrderList(_orderList: OrderList){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'/orderedlist/orderedlistsTime', JSON.stringify(_orderList), {
        headers: this.headerConfig,
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // Get array of order list by user id
  public getOrderListByUserId(id : number): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(this.url + '/orderedlist/userid/' + id , {headers: this.headerConfig} );
  }
  // Get array of orderlist by orderlist id
  public getOrderListByOlid(id : number): Observable<OrderList> {
    return this.http.get<OrderList>(this.url + '/orderedlist/' + id , {headers: this.headerConfig} );
  }

  // Update order list
  public updateOrderList(_orderList: OrderList){
    return new Promise((resolve, reject) => {
      this.http.put(this.url + '/orderedlist/' , JSON.stringify(_orderList) ,{headers: this.headerConfig})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }




}
