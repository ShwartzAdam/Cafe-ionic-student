import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../model/review";
import {ReviewProvider} from "../../providers/review/review";
import {ReviewListProvider} from "../../providers/review-list/review-list";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'review-item',
  templateUrl: 'review-item.html'
})
export class ReviewItemComponent implements OnInit{
  // holds the reviews for display
  @Input() itemInput: number;
  private review: Review = new Review();
  rate = 3;

  constructor(private revPro: ReviewProvider,
              private revListPro: ReviewListProvider,
              public userPro: UserProvider)
  {}

  ngOnInit(): void {
    this.review.comment = "I stumbled on this undiscovered gem right in our neighboorhood. The waitress was prompt and polite. Everything was just so yummy. The entree I had was sublime. Satisfactory experience, will come again.";
    this.review.stars = 5;
    this.review.userid = 1;
    this.review.rlid = 103;
    // get the reivewslist by item by id
    console.log(this.itemInput);


  }



}
