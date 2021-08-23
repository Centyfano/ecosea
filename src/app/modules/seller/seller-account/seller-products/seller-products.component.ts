import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/models/product';
import { AccountSellerService } from 'src/app/services/account-seller.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
})
export class SellerProductsComponent implements OnInit {
  categories = ['products'];
  products: Product[];
  product: Product | any;

  hasLoaded = false;
  constructor(private sellerService: AccountSellerService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.sellerService.getProducts().subscribe(
      (res: any) => {
        this.products = res;

        this.hasLoaded = true;
      },
      (err) => console.error(err)
    );
  }

  addProduct() {
    
  }
  // updateProducts() {
  //   this.httpClient
  //     .patch<any>(
  //       `https://peaceful-beyond-74495.herokuapp.com/api/seller/products/${id}`
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.products = response;
  //     });
  // }
}
