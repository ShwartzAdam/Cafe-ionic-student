import { Component } from '@angular/core';

/**
 * Generated class for the SnackQuickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'snack-quick',
  templateUrl: 'snack-quick.html'
})
export class SnackQuickComponent {

  text: string;

  constructor() {
    console.log('Hello SnackQuickComponent Component');
    this.text = 'Hello World';
  }

}
