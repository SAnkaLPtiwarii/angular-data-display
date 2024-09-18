import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplayComponent } from './data-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataDisplayComponent],
  template: `
    <h1>{{ title }}</h1>
    <app-data-display></app-data-display>
    <router-outlet></router-outlet>
  `,
  styles: [`
    h1 {
      color: #336699;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'angular-data-display';
}