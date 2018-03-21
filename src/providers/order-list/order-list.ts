import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
//modals
import {OrderList} from "../../model/orderList";

@Injectable()
export class OrderListProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello OrderListProvider Provider');
  }

  public getOrderListById(id): Observable<OrderList> {
    return this.http.get<OrderList>(this.url + '/orderedlists/' + id );
  }

}
