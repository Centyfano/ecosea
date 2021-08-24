import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MustMatch } from '../../../shared/helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userRegisterForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        // lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // phoneNumber: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [MustMatch('password', 'confirmPassword')],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userRegisterForm.controls;
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // get fullName() {
  //   return `${this.capitalizeFirstLetter(
  //     this.f.firstName.value
  //   )} ${this.capitalizeFirstLetter(this.f.lastName.value)}`;
  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userRegisterForm.invalid) {
      return;
    }

    this.loading = true;
    this.account
      .register(
        this.f.name.value,
        this.f.email.value,
        this.f.password.value,
        this.f.confirmPassword.value
      )
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/user/login']);
        },
        error: (error) => {
          this.loading = false;
        },
      });
  }
}
