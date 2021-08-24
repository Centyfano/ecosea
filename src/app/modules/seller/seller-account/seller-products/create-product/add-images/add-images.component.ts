import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSellerService } from 'src/app/services/account-seller.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css'],
})
export class AddImagesComponent implements OnInit {
  imagePreview: ArrayBuffer[] | string | undefined = [];
  errors: any;
  selectedImages: File[] = [];
  slug = this.route.snapshot.queryParams.slug;

  hasloaded = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sellerService: AccountSellerService
  ) {}

  onImagePicked(event: Event) {
    this.selectedImages = (event.target as HTMLInputElement | any).files;
  }
  onUpload() {
    const form = new FormData();
    const len = Object.keys(this.selectedImages).length;
    if (len == 0) {
      this.errors = 'Please select at least one image';
      return;
    }
    for (let i = 0; i < len; i++) {
      form.append(
        'images',
        this.selectedImages[i],
        this.selectedImages[i].name
      );
    }

    this.sellerService.addImages(form, this.slug).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl(`/seller/account/products/detail/${this.slug}`);
  }
  ngOnInit(): void {}
}
