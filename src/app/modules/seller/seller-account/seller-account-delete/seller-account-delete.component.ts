import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerAuthService } from '../../auth/seller-auth.service';

@Component({
  selector: 'app-seller-account-delete',
  templateUrl: './seller-account-delete.component.html',
  styleUrls: ['./seller-account-delete.component.css'],
})
export class SellerAccountDeleteComponent implements OnInit {
  constructor(
    private location: Location,
    private sellerAuthService: SellerAuthService,
    private router: Router
  ) {}

  onCancel() {
    this.location.back();
  }
  onDelete() {
    this.sellerAuthService.deleteAccount().subscribe(
      (s) => {
        this.sellerAuthService.logout();
        localStorage.removeItem('token');
        this.router.navigateByUrl('/seller/login');
      },
      (e) => {
        console.error(e);
      }
    );
  }

  ngOnInit(): void {}
}
