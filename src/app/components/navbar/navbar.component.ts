import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { PifssLogoComponent } from '../icons/pifss-logo/pifss-logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, PifssLogoComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  links = [
    { label: 'العاملين في دول مجلس التعاون', path: '/reports/gcc' },
    { label: 'العاملين بالخارج', path: '/reports/eab' },
  ];
}
