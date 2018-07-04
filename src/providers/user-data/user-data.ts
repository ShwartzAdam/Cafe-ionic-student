import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Events} from "ionic-angular";
import {Student} from "../../model/user";

@Injectable()
export class UserData {
  //public HAS_LOGGED_IN = 'hasLoggedIn';
  public itemList: any;
  public itemListNew: any;
  private userid: number;
  private accessToken: string;
  private stu: Student;

  constructor(public storage: Storage,
              public events: Events) {}
  // Gets userid for any  cause
  public getUserId(): Promise<number> {
    if (this.userid) {
      return Promise.resolve(this.userid);
    }
    else {
      return this.storage.get('userid').then((userid) => {
        this.userid = userid;
        return userid;
      });
    }
  }

  // Sets the userid after succussful login
  public setUserId(userid: number): void {
    this.userid = userid;
    this.storage.set("userid", userid);
  }
  public setToken(token: string): void {
    this.accessToken = token;
    this.storage.set('token',token );
  }
  public getToken(): Promise<string> {
    if (this.accessToken) {
      return Promise.resolve(this.accessToken);
    }
    else {
      return this.storage.get('token').then((accessToken) => {
        this.accessToken = accessToken;
        return accessToken;
      });
    }
  }

  public setStudent(student: Student):void{
    this.stu = student;
  }
  public getStudent(): Student {
    return this.stu;
  }

  public addItemToCart(itemid: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.itemList = [{itemid: itemid}];
      this.storage.get('cart')
        .then((value) => {
          if(value != null){
            // if item exist in the storage dont add it , and present a popup
            let len = value['length'];
            let isExists: boolean = false;
            for (let i = 0 ; i < len ; i ++ ){
              if(value[i]['itemid'] == itemid ) {
                // console.log('true - exist in cart');
                reject(false);
                isExists = true;
              }
            }
            if(!isExists) {
              let theVal = [];
              theVal = value;
              theVal.push(this.itemList[0]);
              this.storage.set('cart', theVal);
              // console.log("item id -> added");
              // console.log( theVal );
              resolve(true);
            }
          }
          else{
            // first item in the cart
            let newVal = this.itemList;
            this.storage.set('cart', newVal);
            // console.log(this.itemList);
            // console.log("first item id -> added");
            // console.log(newVal);
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });

    });
  };

  public getItemsFromCart(): Promise<string> {
    return this.storage.get('cart').then((value) => {
      if(value)
        return value;
      else{
        return null;
      }
    });
  };

  public cleanCart(): Promise<string>  {
    return this.storage.set('cart' , null).then((value) => {
      if(value)
        return value;
      else{
        return null;
      }
    });
  };

  public removeItemFromCart(itemid): Promise<any>{
    return this.storage.get('cart').then((value) => {
        // let oldVal = value;
        let newVal = [];
        this.itemListNew = [];
        let itemcount = 1;
        // console.log(value.length);
        // if null -> clean cart totaly
        if(value.length == null) {
          this.storage.remove('cart');
          return "empty cart";
        }else if(value.length == 1) {
          this.storage.remove('cart');
          return "empty cart";
        } else{
          // console.log(value.length);
          for(let i = 0; i < value.length ; i++ ){
            if(value[i]["itemid"] == itemid) {
              // if it is the itemid - continue and dont save it
              // console.log("equal");
              // console.log(value[i]);
            }else{
              // else ,, lets store it
              // console.log("diff");
              // console.log(value[i]);
              // if only one item set storage to it
              // console.log(itemcount);
            if(itemcount == 1){
                this.itemListNew = [{itemid : value[i]["itemid"]}];
                // newVal = value[i]["itemid"];
                this.storage.set('cart', this.itemListNew );
                // display me the vars before storage
                // console.log(this.itemListNew);
                // console.log(newVal);
            }else{
                let theVal = this.itemListNew;
                theVal.push(value[i]);
                this.storage.set('cart', theVal);
                // console.log(theVal);
                // console.log(this.itemListNew);
              }
              itemcount++;
              // console.log(itemcount);
              //console.log(newVal);
              //
              //this.addItemToCart(value[i]["itemid"]);
            }
        }

        }
        this.itemList = this.itemListNew;
        this.itemListNew = [];
        //this.storage.set('cart', newVal);
    });
  };
  public clearStudent(): void{
    this.stu = new Student();
  }



}
