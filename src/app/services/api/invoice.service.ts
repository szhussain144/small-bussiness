import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getAllInvoices(id?:number):Observable<any>{
    if(id)
      return this.http.get(`${BASE_URL}/invoice?id=${id}`);
    else
      return this.http.get(`${BASE_URL}/invoice`);
  }

  getReportingData():Observable<any>{
      return this.http.get(`${BASE_URL}/invoice/invoices-reporting`);
  }
  
  saveInvoice(payload:any):Observable<any>{
      return this.http.post(`${BASE_URL}/invoice`,payload);
  }
}
