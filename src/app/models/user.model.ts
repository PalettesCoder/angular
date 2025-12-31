// src/app/models/user.model.ts

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  interests: string[]; // e.g., ['Sports', 'Reading', 'Gaming']
  password?: string; // Optional for profile update, but required for signup
}
