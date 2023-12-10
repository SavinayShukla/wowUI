import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) { }

  getPlacePredictions(input: string): Observable<any> {
    const apiUrl = `${environment.host}/vehicle/office/?address_city=${input}`;

    // return this.http.get(apiUrl).pipe(
    //   map((response: any) => response), // Adjust this based on the API response structure
    //   catchError((error) => {
    //     console.error('Error fetching office locations:', error);
    //     return [];
    //   })
    // );
    return this.http.get(apiUrl);
  }
}
