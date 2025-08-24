// src/app/components/auth/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <!-- Left Panel - Form -->
      <div class="form-panel">
        <!-- Header with Logo and Language Selector -->
        <div class="header-section">
          <div class="logo-section">
            <!-- Use your existing logo SVG here -->
            <img src="assets/icons/storify-logo.svg" alt="Storify" class="logo-icon">
            <span class="logo-text">Storify</span>
          </div>
          
          <div class="language-selector">
            <button 
              class="lang-btn" 
              [class.active]="currentLanguage === 'en'"
              (click)="setLanguage('en')"
              title="English">
              <img src="assets/icons/us-flag.svg" alt="English" class="flag-icon">
            </button>
            <button 
              class="lang-btn"
              [class.active]="currentLanguage === 'ar'"
              (click)="setLanguage('ar')"
              title="العربية">
              <img src="assets/icons/palestine-flag.svg" alt="العربية" class="flag-icon">
            </button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="form-content">
          <div class="form-header">
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
            <!-- Email Input -->
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="Enter your email"
                class="form-input"
                [class.error]="hasError('email')"
                autocomplete="email">
              <div *ngIf="hasError('email')" class="error-message">
                {{ getErrorMessage('email') }}
              </div>
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <label for="password">Password</label>
              <div class="password-wrapper">
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Password"
                  class="form-input"
                  [class.error]="hasError('password')"
                  autocomplete="current-password">
                <button
                  type="button"
                  class="password-toggle"
                  (click)="togglePasswordVisibility()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                  <!-- Eye Open Icon -->
                  <svg *ngIf="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <!-- Eye Closed Icon -->
                  <svg *ngIf="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    <path d="M1 1l22 22"/>
                  </svg>
                </button>
              </div>
              <div *ngIf="hasError('password')" class="error-message">
                {{ getErrorMessage('password') }}
              </div>
            </div>

            <!-- Remember Me and Forgot Password -->
            <div class="form-options">
              <label class="checkbox-wrapper">
                <input type="checkbox" formControlName="rememberMe" class="checkbox">
                <span class="checkmark"></span>
                <span class="label-text">Remember for 30 days</span>
              </label>
              
              <button type="button" class="forgot-link" (click)="onForgotPassword()">
                Forgot Password?
              </button>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="login-btn"
              [disabled]="!loginForm.valid || isLoading">
              <span *ngIf="!isLoading">Log In</span>
              <span *ngIf="isLoading" class="loading-text">
                <span class="spinner"></span>
                Logging in...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Right Panel - Brand Circle -->
      <div class="brand-panel">
        <div class="circle-container">
          <!-- Use your existing circle logo SVG here -->
          <img src="assets/icons/storify-circle-large.svg" alt="Storify" class="brand-circle">
        </div>
        
        <!-- Gradient decoration -->
        <div class="gradient-decoration"></div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  currentLanguage = 'en';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  setLanguage(lang: 'en' | 'ar') {
    this.currentLanguage = lang;
    console.log('Language changed to:', lang);

    // Here you can implement language switching logic
    // Example: this.translateService.use(lang);

    // Update document direction for Arabic
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const formData = this.loginForm.value;

      console.log('Login attempt:', formData);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Navigate to dashboard on success
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    this.router.navigate(['/auth/forgot-password']);
  }

  // Helper methods
  hasError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.errors && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Password must be at least ${minLength} characters long`;
    }
    return '';
  }
}