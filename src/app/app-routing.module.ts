import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ReportingComponent } from './reporting/reporting.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'my-products', component: MyProductsComponent },
  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'invoice', component: InvoicesComponent },
  { path: 'report', component: ReportingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'check-out', component: CheckoutComponent },
  { path: 'edit-product/:id', component: AddEditProductComponent },
  { path: 'add-product', component: AddEditProductComponent },
  { path: 'view-invoice/:id', component: ViewInvoiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
