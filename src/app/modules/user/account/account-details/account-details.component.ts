import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from '../_services/user.service';

export interface User {
  name: string;
  email: string;
  phone: number;
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  userInfo: any[] = [];
  userDetails: any[] = [];
  loading = false;
  hasloaded = false;
  userDetailsForm!: FormGroup;
  submitted = false;
  cantEdit = true;
  @Input() user: User | any;

  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.userDetailsForm.controls;
  }

  canEdit() {
    this.cantEdit = false;
    return this.cantEdit;
  }
  cancel() {
    this.cantEdit = true;
    // this.location.back();
  }

  onUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userDetailsForm.invalid) {
      return;
    }

    this.loading = false;
    // console.log(this.userDetailsForm.value);
    this.UserService.editUserProfileName(this.userDetailsForm.value).subscribe(
      (res) => {
        console.log(res);
        this.location.back();
      },
      (err) => {
        console.error(err);
      }
    );

  }

  // view user info
  viewUserInfo() {
    // this.loading = true;

    this.UserService.getUserProfile().subscribe({
      next: (data: any) => {
        this.user = data.data.attributes;
        console.log(this.user);

        this.userDetailsForm = this.formBuilder.group({
          name: [this.user.user_name, [Validators.required]],
          email: [this.user.user_email, [Validators.required, Validators.email]],
        });
        this.hasloaded = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {
    this.viewUserInfo();

  }
}
