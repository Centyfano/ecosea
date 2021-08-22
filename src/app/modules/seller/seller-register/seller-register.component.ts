import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSellerService } from 'src/app/services/account-seller.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/helpers/must-match.validator';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css'],
})
export class SellerRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sellerService: AccountSellerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'password_confirmation')],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onCancel() {
    this.registerForm.reset();
    this.router.navigate(['/seller']);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.sellerService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log('success', res);
        localStorage.setItem('token', res);
        this.router.navigateByUrl('/seller/account');

      },
      (err) => {
        console.error('error',err);
      }
    );
  }
}

