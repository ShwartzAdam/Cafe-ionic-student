import { Component } from '@angular/core';

/**
 * Generated class for the FoodQuickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cor-drink-quick',
  templateUrl: 'cor-drink-quick.html'
})
export class CorDrinkQuickComponent {

  text: string;

  constructor() {
    console.log('Hello FoodQuickComponent Component');
    this.text = 'Hello World';
  }

}
