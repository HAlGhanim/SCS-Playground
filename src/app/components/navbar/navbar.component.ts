import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { PifssLogoComponent } from '../icons/pifss-logo/pifss-logo.component';
import { MsalAuthService } from '../../services/app-services/msal-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, PifssLogoComponent, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(MsalAuthService);

  links = [
    { label: 'العاملين في دول مجلس التعاون', path: '/reports/gcc' },
    { label: 'العاملين بالخارج', path: '/reports/eab' },
  ];

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect();
  }
}
