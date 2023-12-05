
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getAccessToken(): any {
    return localStorage.getItem('token');
  }

  login(token: string) {
    this.setAccessToken(token);
  }

  // Simulate a logout process
  logout() {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null && this.getAccessToken() !== '';
  }

}
