import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  private msalService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);
  private router = inject(Router);
  private baseHref = inject(APP_BASE_HREF, { optional: true }) || '/';

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result) {
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            sessionStorage.removeItem('redirectUrl');
            if (redirectUrl.startsWith(this.baseHref)) {
              this.router.navigateByUrl(redirectUrl);
            } else {
              const cleanUrl = redirectUrl.startsWith('/')
                ? redirectUrl
                : '/' + redirectUrl;
              this.router.navigateByUrl(cleanUrl);
            }
          }
        }
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setActiveAccount();
        this.checkAndRedirectUser();
      });
  }

  setActiveAccount() {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  checkAndRedirectUser() {
    const accounts = this.msalService.instance.getAllAccounts();

    const currentPath = window.location.pathname;
    const isAtRoot =
      currentPath === this.baseHref ||
      currentPath === this.baseHref + '/' ||
      currentPath === '/';

    if (accounts.length > 0 && isAtRoot) {
      this.router.navigate(['/reports/gcc']);
    }
  }
}
