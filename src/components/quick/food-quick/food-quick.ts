import { Component } from '@angular/core';

/**
 * Generated class for the FoodQuickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'food-quick',
  templateUrl: 'food-quick.html'
})
export class FoodQuickComponent {

  text: string;

  constructor() {
    console.log('Hello FoodQuickComponent Component');
    this.text = 'Hello World';
  }

}
