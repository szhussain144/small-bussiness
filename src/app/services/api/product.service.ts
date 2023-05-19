import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get(`${BASE_URL}/product`);
  }
  getAllProductsBySupplier(id:number):Observable<any>{
    return this.http.get(`${BASE_URL}/product/product-by-supplier/${id}`);
  }

  createProduct(product: FormData): Observable<any> {
    return this.http.post(`${BASE_URL}/product`, product);
  }
}
