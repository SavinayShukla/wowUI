import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchCardData = new BehaviorSubject<any>(null);
  
  constructor() { }
  
  //This will always be the selected card data.
  searchCardData$ = this.searchCardData.asObservable();

  updateResultCardData(data: any) {
    this.searchCardData.next(data);
  }
}
