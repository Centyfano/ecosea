import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY, NextObserver } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  LoginSeller,
  CreateSeller,
  EditSeller,
} from '../modules/models/seller';

const url = 'https://peaceful-beyond-74495.herokuapp.com/api/seller',
  authUrl = `${url}/auth/seller`;

@Injectable({
  providedIn: 'root',
})
export class AccountSellerService {
  constructor(private http: HttpClient, private router: Router) {}

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // get seller
  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // register
  register(user: CreateSeller): Observable<CreateSeller> {
    console.log(user);
    return this.http
      .post<CreateSeller>(`${url}/register`, user, this.options)
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError(this.handleError)
      );
  }

  // login
  login(user: LoginSeller): Observable<LoginSeller> {
    return this.http
      .post(`${url}/login`, user, { responseType: 'text' as const })
      .pipe(
        tap((res: any) => {
          // console.log(res)
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // (`${url}/login`, user, { responseType: 'text' }).pipe(catchError(this.handleError));

  // AUTH

  getSeller(): Observable<any> {
    return this.http.get(authUrl).pipe(
      tap((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Edit Seller details.
   * @param details : {name: string, phone: number}
   */
  editSeller(details: EditSeller): Observable<EditSeller> {
    return this.http.patch<EditSeller>(authUrl, details, this.options).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(this.handleError)
    );
  }

  // logout
  logout(): Observable<any> {
    return this.http
      .post(`${url}/logout`, {})
      .pipe(catchError(this.handleError));
  }

  // handle error
  private handleError(error: HttpErrorResponse) {
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
    return throwError(error.error.errors);
  }
}

// post(url: string, body: any, options: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; observe: "events"; context?: HttpContext | undefined; params?: HttpParams | { ...; } | undefined; reportProgress?: boolean | undefined; responseType?: "json" | undefined; withCredentials?: boolean | undefined; })
