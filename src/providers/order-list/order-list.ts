import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/timeout";
//modals
import {OrderList} from "../../model/orderList";
import {UserData} from "../user-data/user-data";

@Injectable()
export class OrderListProvider {
  public urlPrd = 'https://cafeappserver.herokuapp.com/api';
  public url = 'http://localhost:3000/api';
  public headerConfig: any;

  constructor(public http: HttpClient) {
    //this.setToken();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    this.headerConfig = headers;
  }
  /*
  setToken(){
    console.log('Order List Provider - Setting Access Token');
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
  // CREATE ORDER LIST
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
  // CHECK TIME SLOT FOR PENDING ORDER LIST
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

  // GET ARRAY OF ORDER LIST BY USER ID
  public getOrderListByUserId(id : number): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(this.url + '/orderedlist/userid/' + id , {headers: this.headerConfig} );
  }
  // GET ARRAY OF ORDERLIST BY ORDERLIST ID
  public getOrderListByOlid(id : number): Observable<OrderList> {
    return this.http.get<OrderList>(this.url + '/orderedlist/' + id , {headers: this.headerConfig} );
  }

  // UPDATE ORDER LIST
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
