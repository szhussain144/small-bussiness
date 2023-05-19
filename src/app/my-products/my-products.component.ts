import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ProductService } from '../services/api/product.service';
import { UserService } from '../services/api/user.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent {
  products: Array<any> = [];
  public gridData: GridDataResult = {
    data: this.products,
    total: this.products.length,
  };
  public pageSize = 10;
  public skip = 0;
  public total = 10;

  constructor(private userService: UserService,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.userService.userProducts().subscribe((res: any) => {
      if (res?.success) {
        this.products = res?.payload;
      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  deleteProduct(id:Number):void{
    this.userService.deleteProduct(id).subscribe((res:any)=>{
      if(res.success){
        this.products = this.products.filter(element => element.id !== id);
        this.notificationService.show({
          content: "Product Deleted",
          cssClass: "button-notification",
          animation: { type: "slide", duration: 400 },
          position: { horizontal: "center", vertical: "bottom" },
          type: { style: "error", icon: true },
          hideAfter:500
        });
      }
    })
  }
}
