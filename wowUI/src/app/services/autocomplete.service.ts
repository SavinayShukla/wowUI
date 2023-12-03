import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private autocompleteService: google.maps.places.AutocompleteService;

  constructor() {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  getPlacePredictions(input: string): Promise<google.maps.places.AutocompletePrediction[]> {
    return new Promise((resolve, reject) => {
      this.autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(predictions || []);
        } else {
          reject(status);
        }
      });
    });
  }
}
