/**
 * Review Item component - display reviews for item
 *
 */
import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../model/review";
import {ReviewProvider} from "../../providers/review/review";
import {ReviewListProvider} from "../../providers/review-list/review-list";
import {UserProvider} from "../../providers/user/user";
import {User} from "../../model/user";
import {CapitalizeFirstPipe} from "../../pipes/capitalize-first/capitalize-first";

@Component({
  selector: 'review-item',
  templateUrl: 'review-item.html',
  providers: [CapitalizeFirstPipe]
})
export class ReviewItemComponent implements OnInit{
  // holds the reviews for display
  @Input() itemInput: number;
  public reviews: Review[] = new Array();
  public users: User = new User();
  public displayEmptyMessage: boolean = false;
  constructor(public revPro: ReviewProvider)
  {}

  ngOnInit(): void {
    this.revPro.getReviewByItemId(this.itemInput).subscribe(
      res => {
          this.reviews = res;
          let len = this.reviews.length;
          if( len == 0 ) {
            // display empty review meesage
            this.displayEmptyMessage = true;
          }
      });
    // get the reivewslist by item by id
  }



}
