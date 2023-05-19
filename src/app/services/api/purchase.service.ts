import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  savePurchase(formData:any):Observable<any>{
    return this.http.post(`${BASE_URL}/purchase`,formData);
  }
}
