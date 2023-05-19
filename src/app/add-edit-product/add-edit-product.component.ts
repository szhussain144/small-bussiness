import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/api/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/api/user.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  product: any;
  productID: number = 0;
  productForm: FormGroup;
  imageFile: string = '';
  updateProduct: Boolean = false;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private userService: UserService,
    private route:Router
  ) {
    this.router.params.subscribe((res: any) => {
      if (res) {
        this.productID = res.id;
        if(this.productID)
          this.updateProduct = true;
      }
    });
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.userProductByID(this.productID).subscribe((res: any) => {
      this.product = res?.payload;
      this.productForm
        .get('name')
        ?.setValue(this.product ? this.product.name : '');
      this.productForm
        .get('price')
        ?.setValue(this.product ? this.product.price : '');
      this.productForm
        .get('quantity')
        ?.setValue(this.product ? this.product.quantity : '');
      this.productForm
        .get('description')
        ?.setValue(this.product ? this.product.description : '');
    });
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.updateProduct) {
    const formData: FormData = new FormData();
    formData.append('productImage', this.imageFile);
    this.userService
      .updateUserProductImage(formData, this.productID)
      .subscribe((res) => {
        console.log(res);
      });
    }
  }

  onSubmit() {
    console.log(this.updateProduct)
    if (this.productForm.valid) {
      console.log(this.productForm);
      if (this.updateProduct) {
        this.userService
          .updateUserProducts(this.productForm.value, this.productID)
          .subscribe((res) => {
            console.log(res);
            this.route.navigate(['/my-product']);
          });
      } else {
        const formData: FormData = new FormData();
        formData.append('name', this.productForm.get('name')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        formData.append('quantity', this.productForm.get('quantity')?.value);
        formData.append(
          'description',
          this.productForm.get('description')?.value
        );
        formData.append('image',this.imageFile);
        this.productService.createProduct(formData).subscribe((res) => {
          console.log(res);
          this.route.navigate(['/my-product']);
        });
      }
    }
  }
}
