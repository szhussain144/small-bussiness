import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ProductService } from '../services/api/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Array<any> = [];
  public gridData: GridDataResult = {
    data: this.products,
    total: this.products.length,
  };
  public pageSize = 10;
  public skip = 0;
  public total = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res?.success) {
        this.products = res?.payload;
      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

}
