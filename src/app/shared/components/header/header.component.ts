import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { SellerAuthService } from 'src/app/modules/seller/auth/seller-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private sellerAuthService: SellerAuthService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const currentUrl = window.location.href.split('/');
        let exists = Object.values(currentUrl).includes('account');
        if (exists) {
          this.loggedIn = true;
          this.ref.markForCheck();
        }
      }
    });
  }

  isLogged() {
    if (this.sellerAuthService.isLoggedIn()) this.loggedIn = true;
  }

  ngOnInit(): void {
    this.isLogged()
  }
}
