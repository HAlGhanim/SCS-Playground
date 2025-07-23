import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="bg-white shadow rounded-lg">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
