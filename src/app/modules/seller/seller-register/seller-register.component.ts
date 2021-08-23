import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/helpers/must-match.validator';
import { SellerAuthService } from '../auth/seller-auth.service';

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
    private sellerAuthService: SellerAuthService,
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

    this.sellerAuthService.register(this.registerForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/seller/account');
      },
      (err) => {
        console.error('error', err);
      }
    );
  }
}

