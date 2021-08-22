import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountSellerService } from 'src/app/services/account-seller.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

export interface Seller {
  name: string;
  phone: number;
}

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css'],
})
export class SellerDetailsComponent implements OnInit {
  @Input() seller: Seller | any = {};

  cantEdit = true;
  autofocus = 'false' || 'autofocus';
  constructor(
    private fb: FormBuilder,
    public sellerService: AccountSellerService,
    private location: Location,
    private router: Router
  ) { }
  // seller: any = {}


  editForm = this.fb.group({
    name: [this.seller.name, [Validators.required]],
    phone: [this.seller.phone, [Validators.required]],
  });

  canEdit() {
    this.cantEdit = false;
    this.autofocus = 'autofocus';
    return this.cantEdit, this.autofocus;
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.sellerService.editSeller(this.editForm.value).subscribe(
      (res) => {
        console.log(res);
        this.location.back();

      },
      (err) => {
        console.error(err);
      }
    );
  }

  cancel() {
    this.location.back()
  }

  ngOnInit(): void {}
}
