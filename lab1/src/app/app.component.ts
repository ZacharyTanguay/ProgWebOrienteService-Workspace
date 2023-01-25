import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cheapWisdom = 'Cheap wisdom is expensive';
  n ?: number;

  constructor() {
    this.n = 13;
  }

}
