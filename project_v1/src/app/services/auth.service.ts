import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private usersUrl = 'assets/users.json';
  
  constructor(private http: HttpClient) {}
  
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

  checkLogin(username: string, password: string): Observable<any> {
    return this.http.get(this.usersUrl)
      .pipe(
        map((response: any) => {
          const users = response as any[];
          const user = users.find(u => u.username === username && u.password === password);
          if (user) {
            // Set the user information in the shared service
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        })
      );
  }
}
