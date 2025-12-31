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
      ]]
    });
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

    const { email, password } = this.loginForm.value;

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
}
