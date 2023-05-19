import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  invoiceData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }
}
