// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/common/cart.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { PurchaseService } from '../services/api/purchase.service';
import { InvoiceService } from '../services/api/invoice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  craeteAccount: Boolean = false;
  summaryData: Array<any> = [];
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: [''],
    });
    this.cartService.cartData.subscribe((res) => (this.summaryData = res));
  }

  toggleCreditCardValidation(): void {
    const password: any = this.checkoutForm.get('password');

    if (this.craeteAccount) {
      password.setValidators([Validators.required]);
    } else {
      password.clearValidators();
    }
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.summaryData) {
      total += item.price;
    }
    return total;
  }

  submitForm(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    if (!this.craeteAccount) {
      this.notificationService.show({
        content:
          'Thank you for shopping your order will be delivered ' +
          this.checkoutForm.value.name,
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'success', icon: true },
        hideAfter: 500,
      });
      this.router.navigate(['/']);
    } else {
      const payload = {
        products: this.summaryData,
        name: this.checkoutForm.value.name,
        email: this.checkoutForm.value.email,
        address: this.checkoutForm.value.address,
        phoneNumber: this.checkoutForm.value.phoneNumber,
        password: this.checkoutForm.value.password,
      };
      this.invoiceService.saveInvoice(payload).subscribe((res) => {
        if (res.success) {
          this.notificationService.show({
            content:
              'Thank you for shopping your order will be delivered ' +
              this.checkoutForm.value.name,
            cssClass: 'button-notification',
            animation: { type: 'slide', duration: 400 },
            position: { horizontal: 'center', vertical: 'top' },
            type: { style: 'success', icon: true },
            hideAfter: 500,
          });
          this.router.navigate(['/']);
        }
      });
    }
    console.log(this.checkoutForm.value);
  }
}
