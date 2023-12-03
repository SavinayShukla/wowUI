import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'assets/database.json';

  constructor(private http: HttpClient) { }

  saveUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.usersUrl)
      .pipe(map((response: any) => {
        const users = response.users as any[];
        console.log(users);
        users.push(user);
        console.log(users);
        return this.http.put(this.usersUrl, users, { headers });
      }));
  }

}
