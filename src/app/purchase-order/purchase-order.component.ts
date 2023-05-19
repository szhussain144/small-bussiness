import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/api/product.service';
import { SupplierService } from '../services/api/supplier.service';
import { PurchaseService } from '../services/api/purchase.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  products: Array<any> = [];
  productsList: Array<any> = [];
  suppliers: Array<any> = [];
  suppliersList: Array<any> = [];
  purchaseOrderForm: FormGroup;

  constructor(
    private productService: ProductService,
    private supplierService: SupplierService,
    private purchaseService: PurchaseService
  ) {
    this.purchaseOrderForm = new FormGroup({
      selectedsupplier: new FormControl('', Validators.required),
      selectedProduct: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.supplierService.getAllProducts().subscribe((res) => {
      if (res?.success) {
        this.suppliers = res?.payload;
        this.suppliers.map((element) => this.suppliersList.push(element.name));
      }
    });
  }

  getProducts(event: any) {
    let supplier: any = this.suppliers.filter(
      (element) => element.name === event
    );
    console.log(supplier);
    this.productService
      .getAllProductsBySupplier(supplier[0]?.id)
      .subscribe((res) => {
        this.products = res.payload;
        this.products.map((element) => this.productsList.push(element.name));
      });
  }

  submitPurchaseOrder() {
    console.log(this.purchaseOrderForm.value);
    if (this.purchaseOrderForm.invalid) {
      return;
    }
    const payload = {
      product: this.products.filter(
        (element) =>
          element.name === this.purchaseOrderForm.value.selectedProduct
      )[0],
      supplier: this.suppliers.filter(
        (element) =>
          element.name === this.purchaseOrderForm.value.selectedsupplier
      )[0],
      quantity: this.purchaseOrderForm.value.quantity,
    };

    this.purchaseService.savePurchase(payload).subscribe((res)=>{
      if(res.success){
        this.purchaseOrderForm.reset();
      }
    })
  }
}
