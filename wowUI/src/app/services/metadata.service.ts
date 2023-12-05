import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private metadataURI = `${environment.host}/swimlane/metadata/`;
  private metadataSubject = new BehaviorSubject<any>([]);
  //Payment Method as an observable.
  metadata$ = this.metadataSubject.asObservable();

  constructor(private http : HttpClient, private authService: AuthService) { }

  fetchMetaData(): Observable <any>{
    const token = this.authService.getAccessToken();
    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
      return this.http.get(this.metadataURI, {headers});
    }
    return of(null);
  }

  updateMetaData(newMetaData: any) {
    this.metadataSubject.next(newMetaData);
  }
}
