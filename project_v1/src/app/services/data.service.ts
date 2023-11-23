import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataURL = 'assets/database.json';
  
  constructor(private http: HttpClient) { }
  getResults(): Observable<any> {
    return this.http.get(this.dataURL);
  }
}
