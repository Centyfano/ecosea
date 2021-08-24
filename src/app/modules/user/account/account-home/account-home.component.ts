import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css'],
})
export class AccountHomeComponent implements OnInit {
  userDetails: any = {};
  loading = false;
  user: any;

  constructor(
    private accountService: AccountService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.viewUserInfo();
  }

  viewUserInfo() {
    this.loading = true;
    this.UserService.getUserProfile().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.getUserInfo(data.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getUserInfo(data: any) {
    this.user = data.user_id;
    this.userDetails = {
      name: data.attributes.user_name,
      email: data.attributes.user_email,
      id: data.user_id,
    };
  }

  logout() {
    this.loading = true;
    this.accountService.logout().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
