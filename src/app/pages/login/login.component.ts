import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from '../../interfaces/Authentication.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/api-services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = signal(false);

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading.set(true);

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackbar.open('Login successful!', 'Close', { duration: 2000 });
          const returnUrl =
            this.router.routerState.snapshot.root.queryParams['returnUrl'] ||
            '/';
          this.router.navigate([returnUrl]);
        } else {
          this.snackbar.open('Unexpected login response.', 'Close', {
            duration: 3000,
          });
        }
      },
      error: (err) => {
        const msg =
          err?.status === 401
            ? 'Invalid username or password.'
            : 'Login failed. Please try again.';
        this.snackbar.open(msg, 'Close', { duration: 3000 });
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
