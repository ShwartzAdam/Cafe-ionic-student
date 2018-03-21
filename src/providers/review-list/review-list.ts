import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReviewListProvider {

  url = 'http://localhost:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello ReviewListProvider Provider');
  }

}
