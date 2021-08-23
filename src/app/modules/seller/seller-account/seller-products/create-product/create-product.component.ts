import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountSellerService } from 'src/app/services/account-seller.service';
import { Location } from '@angular/common';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  imagePreview: ArrayBuffer[] | string | undefined;
  imagesPreview: ArrayBuffer[] | string | undefined;
  submitted = false;
  hasloaded = false;
  errors: any;

  // form
  createForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    currency: ['KSH', Validators.required],
    discount_percent: [''],
    quantity_in_stock: [''],
    video: [''],
    details: [''],
    unit: [''],
    active: [''],
    minimum_order_quantity: [''],
    product_category_id: [''],
    cover_image: [null, Validators.required],
    images: [null],
  });

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.createForm.patchValue({ cover_image: file });
    this.createForm.get('cover_image')?.updateValueAndValidity();
    // console.log(file);
    console.log(file, typeof file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onImagesPicked(event: Event) {
    const file = (event.target as HTMLInputElement | any).files[0];
    this.createForm.patchValue({ images: [file] });
    this.createForm.get('images')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagesPreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onCreate() {
    this.submitted = true;
    console.log(this.createForm.value);
    const form = new FormData();
    const image: File = this.createForm.value.cover_image;
    // console.log(typeof image);

    form.append('name', this.createForm.value.name);
    form.append('price', this.createForm.value.price);
    form.append('currency', this.createForm.value.currency);
    form.append('discount_percent', this.createForm.value.discount_percent);
    form.append('quantity_in_stock', this.createForm.value.quantity_in_stock);
    form.append('details', this.createForm.value.details);
    form.append('unit', this.createForm.value.unit);
    form.append('active', this.createForm.value.active);
    form.append(
      'minimum_order_quantity',
      this.createForm.value.minimum_order_quantity
    );
    form.append(
      'product_category_id',
      this.createForm.value.product_category_id
    );
    form.append('cover_image', image, this.createForm.value.name);
    form.append('images', this.createForm.value.images);

    this.sellerService.createProduct(form).subscribe(
      (res) => {
        console.log(res);
        this.location.back();
      },
      (err) => {
        console.error(err);
        this.errors = err.errors.meta;
        console.log(this.errors);
        this.hasloaded = true;
      }
    );
  }
  constructor(
    public fb: FormBuilder,
    private sellerService: AccountSellerService,
    private location: Location
  ) {}

  ngOnInit(): void {}
}
