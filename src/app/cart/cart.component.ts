import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CartService } from '../services/common/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Array<any> = [];
  public gridData: GridDataResult = {
    data: this.products,
    total: this.products.length,
  };
  public pageSize = 10;
  public skip = 0;
  public total = 10;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartData.subscribe((res: any) => {
        this.products = res;
        console.log(this.products)
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  deleteProduct(id:Number):void{
    this.cartService.cartData.next(this.products.filter(element => element.id !== id))
  }
}
