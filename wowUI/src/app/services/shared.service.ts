import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private getVehiclesURI = `${environment.host}/vehicle/get/`;

  private searchCardSubject = new BehaviorSubject<any>(null);
  searchCardData$ = this.searchCardSubject.asObservable();

  private searchSubject = new BehaviorSubject<any>(null);
  searchDetails$ = this.searchSubject.asObservable();

  private pricingSubject = new BehaviorSubject<any>(null);
  pricingInfo$ = this.pricingSubject.asObservable();

  private resultSubject = new BehaviorSubject<any[]>([]);
  results$ = this.resultSubject.asObservable();
  
  constructor(private http: HttpClient) { }
  
  updateResultCardData(newResultCard: any) {
    this.searchCardSubject.next(newResultCard);
  }

  updateSearchDetails(newSearchDetails: any) {
    this.searchSubject.next(newSearchDetails);
  }

  updateResults(newResults: any) {
    this.resultSubject.next(newResults);
  }

  updatePricing() {
    var basePrice = this.searchCardSubject.value.class_id.rent_charge;
    //Calculation of days
    const startMoment = moment(new Date(this.searchSubject.value.pickupDate));
    const endMoment = moment(new Date( this.searchSubject.value.dropoffDate));
    var days  = endMoment.diff(startMoment, 'days') + 1;
    const subtotal = (basePrice * days);
    var taxes = 0.18 * subtotal;
    const totalPrice = subtotal + taxes;
    this.pricingSubject.next({subtotal : subtotal,
                              finalPrice : totalPrice,
                              originalPrice: totalPrice,
                              coupon : null});
  }
  
  //This will be called in the guard.
  getResultCardData():any {
    return this.searchCardSubject.value;
  }

  applyCoupon(percent:number):any{
    var prevPrice = this.pricingSubject.value.originalPrice;
    const newPrice = prevPrice * (1 - percent);
    const couponDiscount = prevPrice - newPrice;
    this.pricingSubject.next({subtotal : this.pricingSubject.value.subtotal,
                              finalPrice : newPrice,
                              originalPrice: prevPrice,
                              coupon : couponDiscount});
  }

  getVehicles(request : any): Observable<any> {
    return this.http.post(this.getVehiclesURI, request);
  }

}
