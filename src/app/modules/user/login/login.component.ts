import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  submitted = false;
  loading = false;
  errors: any;
  usererror: any;

  constructor(
    private formBuilder: FormBuilder,
    private account: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkbox: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userLoginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.userLoginForm.invalid) {
      return;
    }

    this.loading = true;
    this.submitted = true;
    this.account.login(this.f.email.value, this.f.password.value).subscribe({
      next: (tok: any) => {
        const token = JSON.parse(tok)
        // console.log(token.token);
        this.account.userToken = token.token;
        localStorage.setItem('token', token.token);
        this.router.navigateByUrl('/user/account');
      },
      error: (err) => {
        console.log(err);
        this.errors = err.errors;
        // this.usererror = err.errors.meta.email[0] || err.errors.meta.password[0];
        if (err.errors.meta.password) {
          this.usererror = err.errors.meta.password[0];
        } else if (err.errors.meta.email) {
          this.usererror = err.errors.meta.email[0];
        }
        this.loading = false;
        this.loading = false;
        // console.error(error);
      },
    });
  }
}
