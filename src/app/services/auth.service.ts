// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulates a logged-in user
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Simulates user database (for demonstration)
  private users: User[] = [];

  constructor(private router: Router) {
    // Initialize currentUser from local storage if available
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Initialize users from local storage if available, otherwise an empty array
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Simulates user login.
   * @param email User's email.
   * @param password User's password.
   * @returns Observable<boolean> - true if login successful, false otherwise.
   */
  login(email: string, password: string): Observable<boolean> {
    // In a real app, this would be an API call to authenticate
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      // Store user in local storage (simplified for demo)
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    }
    return of(false);
  }

  /**
   * Simulates user signup.
   * @param newUser User object containing registration details.
   * @returns Observable<boolean> - true if signup successful, false otherwise (e.g., email already exists).
   */
  signup(newUser: User): Observable<boolean> {
    // In a real app, this would be an API call to register
    if (this.users.some(u => u.email === newUser.email)) {
      return of(false); // Email already exists
    }
    // Assign a simple ID for the mock user
    newUser.id = (this.users.length + 1).toString();
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users)); // Save updated users array
    // Optionally log in the user after signup
    this.login(newUser.email, newUser.password || '');
    return of(true);
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/products']); // Redirect to product page
  }

  /**
   * Updates the current user's profile information.
   * @param updatedUser The updated user object.
   * @returns Observable<boolean> - true if update successful, false otherwise.
   */
  updateProfile(updatedUser: User): Observable<boolean> {
    const currentUserId = this.currentUserValue?.id;
    if (!currentUserId) {
      return of(false); // No user logged in
    }

    const index = this.users.findIndex(u => u.id === currentUserId);
    if (index > -1) {
      // Ensure email is not changed (as per requirement)
      updatedUser.email = this.users[index].email;
      this.users[index] = { ...this.users[index], ...updatedUser };
      localStorage.setItem('users', JSON.stringify(this.users)); // Save updated users array
      // Update local storage and current user subject
      localStorage.setItem('currentUser', JSON.stringify(this.users[index]));
      this.currentUserSubject.next(this.users[index]);
      return of(true);
    }
    return of(false);
  }
}
