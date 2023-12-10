import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private startBookingURI = `${environment.host}/swimlane/booking/begin/`;
  private confirmBookingURI = `${environment.host}/swimlane/booking/complete/`;
  private endBookingURI = `${environment.host}/swimlane/booking/end/`;
  private updateBookingURI = `${environment.host}/swimlane/booking/update/`;
  private getBookingsURI = `${environment.host}/swimlane/booking/`;
  private startRideURI = `${environment.host}/swimlane/booking/start/`;
  
  
  private bookingSubject = new BehaviorSubject<any[]>([]);
  booking$ = this.bookingSubject.asObservable();

  private finalBookingSubject = new BehaviorSubject<any[]>([]);
  finalBooking$ = this.finalBookingSubject.asObservable();

  //Booking subjects
  private pendingOrderSubject = new BehaviorSubject<any[]>([]);
  pendingOrders$ = this.pendingOrderSubject.asObservable();

  private ongoingOrdersSubject = new BehaviorSubject<any[]>([]);
  ongoingOrders$ = this.ongoingOrdersSubject.asObservable();

  private completedOrdersSubject = new BehaviorSubject<any[]>([]);
  completedOrders$ = this.completedOrdersSubject.asObservable();

  //Edit or Update Car Rides
  private selectedBookingSubject = new BehaviorSubject<any[]>([]);
  selectedBooking$ = this.selectedBookingSubject.asObservable();

  updateSelectedBooking(newBooking :any){
    this.selectedBookingSubject.next(newBooking);
  }

  getSelectedBooking() : any {
    return this.selectedBookingSubject.value;
  }
  
  constructor(private authService: AuthService, private http: HttpClient) { }

  bookingBegin(booking: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.startBookingURI, booking, {headers});
    }
    return of(null);
  }

  bookingConfirm(booking: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.confirmBookingURI, booking, {headers});
    }
    return of(null);
  }

  bookingEnd(booking: any) : Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.endBookingURI, booking, {headers});
    }
    return of(null);
  }

  bookingUpdate(booking: any) : Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.updateBookingURI, booking, {headers});
    }
    return of(null);
  }


  startRide(booking: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.startRideURI, booking, {headers});
    }
    return of(null);
  }

  updateBooking(newBooking: any){
    this.bookingSubject.next(newBooking);
  }

  updateFinalBooking(newBooking: any){
    this.finalBookingSubject.next(newBooking);
  }

  getBookingData() : any{
    return this.bookingSubject.value;
  }

  getBookings(): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.getBookingsURI, {headers});
    }
    return of(null);
  }

  refreshBookingLists(){
    this.getBookings().subscribe((response : any[]) => {
      this.pendingOrderSubject.value.length = 0;
      this.ongoingOrdersSubject.value.length = 0;
      this.completedOrdersSubject.value.length = 0;
      response.forEach((booking) =>{
        if(booking.trip_status === "P"){
          this.pendingOrderSubject.value.push(booking);
        }
        else if(booking.trip_status === "O"){
          this.ongoingOrdersSubject.value.push(booking);
        }
        else{
          this.completedOrdersSubject.value.push(booking);
        }
      });
    })
  }
}
