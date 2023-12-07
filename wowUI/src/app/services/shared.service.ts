import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchCardSubject = new BehaviorSubject<any>(null);
  searchCardData$ = this.searchCardSubject.asObservable();

  private searchSubject = new BehaviorSubject<any>(null);
  searchDetails$ = this.searchSubject.asObservable();

  // private couponSubject = new BehaviorSubject<any>(null);
  // coupon$ = this.couponSubject.asObservable();

  private pricingSubject = new BehaviorSubject<any>(null);
  pricingInfo$ = this.pricingSubject.asObservable();
  
  constructor() { }
  
  updateResultCardData(newResultCard: any) {
    this.searchCardSubject.next(newResultCard);
  }

  updateSearchDetails(newSearchDetails: any) {
    this.searchSubject.next(newSearchDetails);
  }

  // updateCoupon(newCoupon: any) {
  //   this.couponSubject.next(newCoupon);
  // }

  updatePricing() {
    var basePrice = this.searchCardSubject.value.rate;
    //Calculation of days
    const startMoment = moment(new Date(this.searchSubject.value.pickupDate));
    const endMoment = moment(new Date( this.searchSubject.value.dropoffDate));
    var days  = endMoment.diff(startMoment, 'days');
    const totalPrice = (basePrice * days);
    this.pricingSubject.next({finalPrice : totalPrice,
                              originalPrice: totalPrice,
                              coupon : null});
  }
  
  //This will be called in the guard.
  getResultCardData():any {
    return this.searchCardSubject.value;
  }

  applyCoupon(percent:number):any{
    var prevPrice = this.pricingSubject.value.originalPrice;
    const newPrice = prevPrice * (1- percent);
    const couponDiscount = prevPrice - newPrice;
    this.pricingSubject.next({finalPrice : newPrice,
                              originalPrice: prevPrice,
                              coupon : couponDiscount});
  }
}
