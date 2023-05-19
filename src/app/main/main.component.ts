import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/api/product.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SessionService } from '../services/common/session.service';
import { CartService } from '../services/common/cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  products: Array<any> = [];
  filteredProducts: Array<any> = [];
  productList: Array<any> = [];
  autoComplete: FormGroup;
  session: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private sessionService: SessionService
  ) {
    this.autoComplete = this.fb.group({
      searchValue: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sessionService.session.subscribe((res) => {
      if (res && res.userType === 'BUYER') {
        this.session = false;
        this.getAllProducts();
      } else if (res && res.userType === 'SELLER') {
        this.session = true;
      } else {
        var user: any = localStorage.getItem('user');
        if (user && user.userType === 'BUYER') {
          this.session = false;
          this.getAllProducts();
        } else if (user && user.userType === 'SELLER') {
          this.session = true;
        } else {
          this.session = false;
          this.getAllProducts();
        }
      }
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res.success) {
        this.products = res?.payload;
        this.filteredProducts = this.products;
        this.products.map((element) => this.productList.push(element.name));
      }
    });
  }

  handleFilter(value: string) {
    if (value === '') {
      this.productList = this.products.map(element => element.name);
      this.filteredProducts = this.products;
    } else {
      const searchValue = value.toLowerCase();
      this.productList = this.products
        .filter(element => element.name.toLowerCase().includes(searchValue))
        .map(element => element.name);
  
      this.filteredProducts = this.products.filter(element =>
        element.name.toLowerCase().includes(searchValue)
      );
    }
  }
  
}
