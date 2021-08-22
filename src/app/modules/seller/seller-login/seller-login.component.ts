import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSellerService } from 'src/app/services/account-seller.service';

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
    private sellerService: AccountSellerService,
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

    this.sellerService.login(this.sellerLoginForm.value).subscribe(
      (token: any) => {
        // this.sellerService.userToken = token;
        console.log('token is', token);
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/seller/account');

        // this.sellerService.userToken
      },
      (err) => {
        this.loading = false;
        this.errors = err;
        this.usererror = this.errors.meta.email[0];
        console.log(this.errors);
      }
    );
  }
}
