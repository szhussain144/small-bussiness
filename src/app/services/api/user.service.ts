import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginUser(formData: any) {
    return this.http.post(`${BASE_URL}/user/login`, formData);
  }

  userProducts() {
    return this.http.get(`${BASE_URL}/user/products`);
  }

  userProductByID(id: number) {
    return this.http.get(`${BASE_URL}/product/${id}`);
  }

  updateUserProducts(formData: any, id: number) {
    return this.http.post(`${BASE_URL}/product/${id}`, formData);
  }
  
  updateUserProductImage(formData: any, id: number) {
    return this.http.post(`${BASE_URL}/product/update-image/${id}`, formData);
  }

  deleteProduct(id: Number) {
    return this.http.delete(`${BASE_URL}/product/${id}`);
  }
}
