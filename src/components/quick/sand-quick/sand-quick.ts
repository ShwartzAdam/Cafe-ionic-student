import { Component } from '@angular/core';

/**
 * Generated class for the SandQuickComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sand-quick',
  templateUrl: 'sand-quick.html'
})
export class SandQuickComponent {

  text: string;

  constructor() {
    console.log('Hello SandQuickComponent Component');
    this.text = 'Hello World';
  }

}
