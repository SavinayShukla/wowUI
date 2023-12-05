import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private usersUrl = 'assets/database.json';
  private regURI = `${environment.host}/user/signup/`;
  private loginURI = `${environment.host}/user/login/`;
  private getProfileURI = `${environment.host}/user/profile/`;
  private userDetailsURI = `${environment.host}/swimlane/customer/`;
  private updatePasswordURI = `${environment.host}/user/password/`;
  private paymentURI = `${environment.host}/swimlane/payment/`;
  private deletePaymentURI = `${environment.host}/swimlane/payment/?payment_id=`;
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.regURI, user, {headers});
  }

  loginUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.loginURI, user, {headers}).pipe(
      map((response : any) => {
        const accessToken = response.access;
        this.authService.login(accessToken);
      })
    );
  }

  updateBasicInfo(user: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.getProfileURI, user, {headers});
    }
    return of(null);
  }

  updateOtherInfo(info: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.userDetailsURI, info, {headers});
    }
    return of(null);
  }

  getUser(): Observable <any>{
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.getProfileURI, {headers});
    }
    return of(null);
  }

  // getPayments(): Observable <any>{
  //   const token = this.authService.getAccessToken();
  //   if(token){
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     });
  //     return this.http.get(this.paymentURI, {headers});
  //   }
  //   return of(null);
  // }

  // deletePayment(id: any) : Observable<any>{
  //   const token = this.authService.getAccessToken();
  //   if(token){
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
        
  //     });
  //     return this.http.delete(this.deletePaymentURI + id, {headers});
  //   }
  //   return of(null);
  // }

  // addPayment(payment: any): Observable<any> {
  //   const token = this.authService.getAccessToken();
  //   if(token){
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     });
  //     return this.http.post(this.paymentURI, payment, {headers});
  //   }
  //   return of(null);
  // }

  getDetails(): Observable <any>{
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.userDetailsURI, {headers});
    }
    return of(null);
  }
  
  updatePassword(passwords: any): Observable<any> {
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.post(this.updatePasswordURI, passwords, {headers});
    }
    return of(null);
  }
}
