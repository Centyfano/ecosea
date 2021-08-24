import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import { SellerAuthService } from '../../auth/seller-auth.service';

@Component({
  selector: 'app-seller-password',
  templateUrl: './seller-password.component.html',
  styleUrls: ['./seller-password.component.css'],
})
export class SellerPasswordComponent implements OnInit {
  sellerPasswordResetForm!: FormGroup;
  submitted = false;
  loaded = false;
  passErr: any;

  constructor(
    private formBuilder: FormBuilder,
    private sellerAuthService: SellerAuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.sellerPasswordResetForm = this.formBuilder.group(
      {
        current_password: ['', Validators.minLength(5)],
        password: ['', [Validators.required, Validators.minLength(5)]],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'password_confirmation')],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.sellerPasswordResetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.sellerPasswordResetForm.invalid) {
      return;
    }

    console.log(this.sellerPasswordResetForm.value);
    this.sellerAuthService
      .changePassword(this.sellerPasswordResetForm.value)
      .subscribe(
        (res) => {
          this.loaded = true;
          this.location.back();
        },
        (err) => {
          this.passErr =
            err.errors.meta.current_password || err.errors.meta.password[0];
          this.sellerPasswordResetForm.reset()
          this.loaded = true;
        }
      );
  }
}
