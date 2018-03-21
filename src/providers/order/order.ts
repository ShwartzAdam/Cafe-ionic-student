import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

//models
import {Order} from "../../model/order";

@Injectable()
export class OrderProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {}

  public getOrderById(): Observable<Order> {
    return this.http.get<Order>(this.url + '/ordereditems' );
  }
}
