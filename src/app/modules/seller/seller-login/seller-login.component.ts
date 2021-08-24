import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerAuthService } from '../auth/seller-auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
})
export class SellerLoginComponent implements OnInit {
  sellerLoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errors: any;
  usererror: any;
  pwerror: any;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sellerAuthService: SellerAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    // console.log(this.sellerLoginForm.value);
    // console.log('err is', this.sellerLoginForm);

    this.submitted = true;

    // stop here if form is invalid
    if (this.sellerLoginForm.invalid) {
      return;
    }

    this.loading = true;

    this.sellerAuthService.login(this.sellerLoginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/seller/account').then((c) => {
          window.location.reload();
        });
      },
      (err) => {
        this.errors = err.errors;
        // this.usererror = err.errors.meta.email[0] || err.errors.meta.password[0];
        if (err.errors.meta.password) {
          this.usererror = err.errors.meta.password[0];
        } else if (err.errors.meta.email) {
          this.usererror = err.errors.meta.email[0];
        }
        this.loading = false;
      }
    );
  }
}
