import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerAuthService } from '../auth/seller-auth.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  constructor(private sellerAuthService: SellerAuthService, private router: Router) { }
  isLogged() {
    if (this.sellerAuthService.isLoggedIn()) this.router.navigateByUrl('/seller/account');
    // return;
  }

  ngOnInit(): void {
    this.isLogged()
  }
}
