import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { MainComponent } from './main/main.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CartComponent } from './cart/cart.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { HeaderComponent } from './header/header.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { HttpInterceptorService } from './services/common/http-interceptor.service';
import { MyProductsComponent } from './my-products/my-products.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import 'hammerjs';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ProductCardComponent,
    ProductListComponent,
    InvoicesComponent,
    PurchaseOrderComponent,
    MainComponent,
    ReportingComponent,
    CartComponent,
    HeaderComponent,
    SidebarComponent,
    AddEditProductComponent,
    MyProductsComponent,
    ViewInvoiceComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputsModule,
    ButtonsModule,
    GridModule,
    LayoutModule,
    NavigationModule,
    IconsModule,
    IndicatorsModule,
    MenuModule,
    AutoCompleteModule,
    NotificationModule,
    DropDownListModule,
    ChartsModule,
    DateInputsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
