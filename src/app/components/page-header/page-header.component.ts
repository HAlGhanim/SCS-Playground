import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <span class="text-xl text-gray-600 w-full">{{ title() }}</span>
        </div>
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  title = input('');
}
