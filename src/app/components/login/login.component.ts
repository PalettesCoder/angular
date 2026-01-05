// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize the login form with form controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]],
      rememberMe: [false]
    });

    // Load saved email if "Remember Me" was checked
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedEmail && savedRememberMe) {
      this.loginForm.patchValue({
        email: savedEmail,
        rememberMe: true
      });
      this.rememberMe = true;
    }
  }

  /**
   * Getter for easy access to form fields in the template.
   */
  get f() { return this.loginForm.controls; }

  /**
   * Handles form submission for user login.
   */
  onSubmit(): void {
    this.errorMessage = ''; // Clear previous error messages

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, rememberMe } = this.loginForm.value;

    // Save email if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('rememberMe');
    }

    this.authService.login(email, password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/products']); // Redirect to products page on successful login
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      error => {
        this.errorMessage = 'An error occurred during login. Please try again.';
        console.error('Login error:', error);
      }
    );
  }

  /**
   * Toggles password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggles remember me checkbox
   */
  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
    this.loginForm.patchValue({ rememberMe: this.rememberMe });
  }
}
