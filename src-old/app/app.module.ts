import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GridModule} from '@progress/kendo-angular-grid';
import {ButtonModule} from '@progress/kendo-angular-buttons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
