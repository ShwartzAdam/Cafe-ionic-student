/**
 * User component - display full name
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {UserProvider} from "../../providers/user/user";
import {User} from "../../model/user";

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent implements OnInit{
  @Input() userId: number;
  public user: User = new User();
  constructor(public userPro: UserProvider) {}

  ngOnInit(): void {
    this.userPro.getUserById(this.userId).subscribe(
      res => {
        this.user = res;
      });

  }


}
