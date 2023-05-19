import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
   products:any = [
    {
      id: 1,
      name: 'Product 1',
      price: 9.99,
      stock: 20,
      description: 'This is the description for Product 1.',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 19.99,
      stock: 15,
      description: 'This is the description for Product 2.',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 29.99,
      stock: 10,
      description: 'This is the description for Product 3.',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 39.99,
      stock: 5,
      description: 'This is the description for Product 4.',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 49.99,
      stock: 0,
      description: 'This is the description for Product 5.',
    },
  ];
  
}
