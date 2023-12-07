import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private autocompleteService: google.maps.places.AutocompleteService;

  constructor(private http: HttpClient) {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  // getPlacePredictions(input: string): Promise<google.maps.places.AutocompletePrediction[]> {
  //   return new Promise((resolve, reject) => {
  //     this.autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         resolve(predictions || []);
  //       } else {
  //         reject(status);
  //       }
  //     });
  //   });
  // }

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
