import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

const API = 'https://peaceful-beyond-74495.herokuapp.com/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.account.userToken}`,
  });

  constructor(private http: HttpClient, private account: AccountService) {}

  // ## USER PROFILE

  // view user profile
  getUserProfile(): Observable<any> {
    return this.http
      .get(`${API}/auth/user`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // get userDetails
  // getUserDetails(): Observable<any> {
  //   let user = new Observable( {name: '', email:''});
  //   this.getUserProfile().subscribe({
  //     next: (data: any) => {
  //       user = {
  //         name: data.data.attributes.user_name,
  //         email: data.data.attributes.user_email,
  //       };
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  //   return user;
  // }

  // edit user profile name
  editUserProfileName(name: string): Observable<any> {
    return this.http
      .patch(`${API}/auth/user`, name, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // update user password
  updateUserPassword(
    current_password: string,
    password: string,
    password_confirmation: string
  ): Observable<any> {
    return this.http
      .post(
        `${API}/auth/update-password`,
        { current_password, password, password_confirmation },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  // delete user account
  deleteUserAccount(): Observable<any> {
    return this.http
      .delete(`${API}/auth/user`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // ## ORDERS

  // view all orders
  viewAllOrders(): Observable<any> {
    return this.http
      .get(`${API}/orders`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // create an order
  createUnpaidOrder(shipping_id: string, payment_id: string): Observable<any> {
    return this.http
      .post(
        `${API}/unpaid/orders`,
        { shipping_id, payment_id },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  // edit an order
  editOrder(
    newOrderId: string,
    shipping_id: string,
    payment_id: string
  ): Observable<any> {
    return this.http.patch(
      `${API}/orders/${newOrderId}`,
      { shipping_id, payment_id },
      { headers: this.headers }
    );
  }

  // ORDER PAYMENT

  // ### PRODUCT REVIEWS

  // create a product review
  createProductReview() {
    return;
  }

  // ## SHIPPING DETAILS

  // view shipping details
  getShippingDetails(): Observable<any> {
    return this.http
      .get(`${API}/auth/user/shippingDetails`)
      .pipe(catchError(this.handleError));
  }

  // view a shipping detail
  getShippingDetail(id: string): Observable<any> {
    return this.http
      .get(`${API}/auth/user/shippingDetails/${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // create shipping detail
  createShippingDetail(
    contact: string,
    country: string,
    location: string
  ): Observable<any> {
    return this.http
      .post(
        `${API}/auth/user/shippingDetails`,
        { contact, country, location },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  // edit shipping detail
  editShippingDetail(
    id: string,
    contact: string,
    country: string,
    location: string
  ): Observable<any> {
    return this.http
      .patch(
        `${API}/auth/user/shippingDetails/${id}`,
        { country, location, contact },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError));
  }

  // delete shipping detail
  deleteShippingDetail(id: string): Observable<any> {
    return this.http
      .delete(`${API}/auth/user/shippingDetails/${id}`)
      .pipe(catchError(this.handleError));
  }

  // ## INBOX

  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}
