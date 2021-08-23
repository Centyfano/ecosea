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
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sellerAuthService: SellerAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    // stop here if form is invalid
    console.log(this.sellerLoginForm.value);
    // console.log('err is', this.sellerLoginForm);

    this.submitted = true;

    if (this.sellerLoginForm.invalid) {
      return;
    }

    this.loading = true;

    this.sellerAuthService.login(this.sellerLoginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        // this.sellerService.userToken = token;
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/seller/account');

        // this.sellerService.userToken
      },
      (err) => {
        this.errors = err.errors;
        this.usererror = this.errors.meta.email[0];
        this.loading = false;        
        // console.log(this.errors);
      }
    );
  }
}
