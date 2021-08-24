import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modules/models/product';
import { AccountSellerService } from 'src/app/services/account-seller.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  hasLoaded = false;
  cantEdit = true;

  editForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private sellerService: AccountSellerService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {}

  getProduct() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.sellerService.getProducts().subscribe(
      (res: any) => {
        const p = res.filter((p: any) => p.slug == slug);
        this.product = p[0];
        this.hasLoaded = true;

        this.editForm = this.fb.group({
          name: [this.product.product_name, [Validators.required]],
          details: [this.product.product_details, [Validators.required]],
          price: [this.product.product_price, [Validators.required]],
          currency: [this.product.currency, [Validators.required]],
          discount_percent: [
            this.product.discount_percent,
            [Validators.required],
          ],
          quantity_in_stock: [
            this.product.quantity_in_stock,
            [Validators.required],
          ],
          video: [this.product.product_video, [Validators.required]],
          unit: [this.product.product_unit, [Validators.required]],
          active: [this.product.active, [Validators.required]],
          product_category_id: [
            this.product.product_category_id,
            [Validators.required],
          ],
        });
      },
      (err) => console.error(err)
    );
  }

  canEdit() {
    this.cantEdit = false;
    return this.cantEdit;
  }
  cancel() {
    this.cantEdit = true;
    return this.cantEdit;
  }
  onSubmit() {
    this.sellerService
      .editProduct(this.editForm.value, this.product.slug)
      .subscribe(
        (res) => {
          this.location.back();
        },
        (err) => {
          console.error(err);
        }
      );
  }
  onDelete() {
    console.log(this.product.slug);
    this.sellerService.deleteProduct(this.product.slug).subscribe(
      (res) => {
        console.log(res);
        this.location.back();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('/seller/account/products');
  }

  ngOnInit(): void {
    this.getProduct();
  }
}
