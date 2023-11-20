import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  
  constructor() { 
    console.log("Called!");
  }
  
  login() {
    this.isLoggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  // Simulate a logout process
  logout() {
    localStorage.removeItem('loggedIn');
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
