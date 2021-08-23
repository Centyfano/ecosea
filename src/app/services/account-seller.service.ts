import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PostProduct, Product } from '../modules/models/product';

const url = 'https://peaceful-beyond-74495.herokuapp.com/api/seller',
  prodUrl = `${url}/products`;
@Injectable({
  providedIn: 'root',
})
export class AccountSellerService {
  constructor(private http: HttpClient, private router: Router) {}

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  };

  /**
   * Get Products
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(prodUrl).pipe(
      map((res: any) => {
        const products = res.data.map((prod: any) => {
          // console.log(prod);
          return {
            product_id: prod.data.product_id,
            product_name: prod.data.attributes.product_name,
            product_price: prod.data.attributes.product_price,
            currency: prod.data.attributes.currency,
            discount_percent: prod.data.attributes.discount_percent,
            quantity_in_stock: prod.data.attributes.quantity_in_stock,
            product_video: prod.data.attributes.product_video,
            product_details: prod.data.attributes.product_details,
            product_unit: prod.data.attributes.product_unit,
            active: prod.data.attributes.active,
            minimum_order_quantity: prod.data.attributes.minimum_order_quantity,
            product_category_id: prod.data.attributes.product_category_id,
            cover_image: prod.data.attributes.cover_image.data.attributes.path,
            images: prod.data.attributes.productImages.data.map(
              (image: any) => {
                return image.data.attributes.path;
              }
            ),
          };
        });
        // console.log(products);
        return products;
      }),
      tap((_) => {
        console.log(`Fetched products`);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Create Product
   * @param data
   * @returns observable
   */
  createProduct(data: FormData): Observable<PostProduct> {
    return this.http.post<PostProduct>(prodUrl, data, this.options).pipe(
      tap((res: any) => console.log(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Edit Product
   * @param product payload
   * @param id ID
   * @returns observable
   */
  editProduct(product: any, id: any): Observable<any> {
    return this.http.patch(`${prodUrl}/${id}`, product).pipe(
      tap((res: any) => console.log(res)),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${prodUrl}/${id}`).pipe(
      tap((res: any) => console.log(res)),
      catchError(this.handleError)
    );
  }

  /**
   * Handle errors
   * @param error
   * @returns
   */
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error);
      // console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        // `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        error
      );
    }
    // return throwError('Something bad happened; please try again later');
    return throwError(error.error);
  }
}

