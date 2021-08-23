import { Component, OnInit } from '@angular/core';
import { AccountSellerService } from 'src/app/services/account-seller.service';
import { SellerAuthService } from '../auth/seller-auth.service';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.css'],
})
export class SellerAccountComponent implements OnInit {
  constructor(private sellerAuthServive: SellerAuthService) {}

  seller: any;
  loaded = false;

  getSeller() {
    this.sellerAuthServive.getSeller().subscribe(
      (res) => {
        this.seller = res.data.attributes;
        this.loaded = true;
        // console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.getSeller();
  }
}
