import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentURI = `${environment.host}/swimlane/payment/`;
  private deletePaymentURI = `${environment.host}/swimlane/payment/?payment_id=`;


  private paymentMethodsSubject = new BehaviorSubject<any>([]);
  //Payment Method as an observable.
  paymentMethods$ = this.paymentMethodsSubject.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPayments(): Observable <any>{
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.paymentURI, {headers});
    }
    return of(null);
  }

  deletePayment(id: any) : Observable<any>{
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        
      });
      return this.http.delete(this.deletePaymentURI + id, {headers});
    }
    return of(null);
  }

  addPayment(payment: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.paymentURI, payment, {headers});
    }
    return of(null);
  }

  updatePaymentMethods(newPaymentMethods: any) {
    this.paymentMethodsSubject.next(newPaymentMethods);
  }
}
