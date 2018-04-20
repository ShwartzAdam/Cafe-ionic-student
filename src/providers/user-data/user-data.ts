import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Events} from "ionic-angular";
import {Order} from "../../model/order";
import {Student} from "../../model/user";

@Injectable()
export class UserData {
  //public HAS_LOGGED_IN = 'hasLoggedIn';
  public itemList: any;
  public itemListNew: any;
  public userid: number;
  public stu: Student;
  //public order: Order[];
  //public orderlist: any[];

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

  public addItemToCart(itemid: number): void {
    this.itemList = [{itemid: itemid}];
    this.storage.get('cart').then((value) => {
      if(value != null){
        let theVal = [];
        theVal = value;
        console.log(theVal);
        console.log(this.itemList);
        console.log(this.itemList[0]);
        theVal.push(this.itemList[0]);
        this.storage.set('cart', theVal);
        console.log("item id : " + theVal+ "added");
      }
      else{
        let newVal = this.itemList;
        this.storage.set('cart', newVal);
        console.log("first item id : " + newVal+ " added");
      }
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
        let oldVal = value;
        let newVal = [];
        this.itemListNew = [];
        let itemcount = 1;
        console.log(value.length);
        if(value.length == null) {
          this.storage.remove('cart');
          return "empty cart";
        }else if(value.length == 1) {
          this.storage.remove('cart');
          return "empty cart";
        } else{
          for(let i = 0; i < value.length ; i++ ){
            if(value[i]["itemid"] == itemid) {
              console.log("equal");
              console.log(value[i]);
            }else{
              console.log("diff");
              console.log(value[i]);
            if(itemcount == 1){
                this.itemListNew = [{itemid : value[i]["itemid"]}];
                newVal = value[i]["itemid"];
                this.storage.set('cart', newVal);
              }else{
                let theVal = this.itemListNew;
                theVal.push(value[i]);
                this.storage.set('cart', theVal);
              }
              itemcount++;
              console.log(itemcount);
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



  public setStudent(student: Student):void{
    this.stu = student;
    console.log(this.stu);
  }

  public clearStudent(): void{
    console.log(this.stu);
    this.stu = null;
    console.log(this.stu);
  }


}
