import { Component, Input } from '@angular/core';
import { ActionsLayout } from '@progress/kendo-angular-dialog';
import { Orientation } from '@progress/kendo-angular-inputs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CartService } from '../services/common/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input()
  product: any;
  public expanded = false;
  public liked = false;
  public btnText = 'More';

  public actionsOrientation: Orientation = 'horizontal';
  public actionsLayout: ActionsLayout = 'end';
  cartData: Array<any> = [];

  constructor(
    private notificationService: NotificationService,
    private cartService: CartService
  ) {
    cartService.cartData.subscribe((res) => (this.cartData = res));
  }

  public get horizontalStretched(): boolean {
    return (
      this.actionsOrientation === 'horizontal' &&
      this.actionsLayout === 'stretched'
    );
  }

  public toggleRecipe(): void {
    this.expanded = !this.expanded;
    this.btnText = this.expanded ? 'Less' : 'More';
  }

  public toggleLike(): void {
    this.liked = !this.liked;
  }

  public heartIcon(): string {
    return this.liked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline';
  }

  public addProducts(product: any): void {
    if (this.cartData.filter((element) => element === product).length === 0 && product.quantity > 0) {
      this.cartData.push(product);
      this.cartService.cartData.next(this.cartData);
      this.notificationService.show({
        content: 'Product Added to cart',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'success', icon: true },
        hideAfter: 500,
      });
    }else{
      this.notificationService.show({
        content: 'Product out of stock',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'bottom' },
        type: { style: 'error', icon: true },
        hideAfter: 500,
      });
    }
  }
}
