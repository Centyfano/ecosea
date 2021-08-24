import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountSellerService } from 'src/app/services/account-seller.service';
import { CreateSeller, EditSeller, LoginSeller } from '../../models/seller';

const url = 'https://peaceful-beyond-74495.herokuapp.com/api/seller',
  authUrl = `${url}/auth/seller`;

@Injectable({
  providedIn: 'root',
})
export class SellerAuthService {
  // get seller
  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * Options
   */
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Create Seller
   * @param user
   * @returns
   */
  register(user: CreateSeller): Observable<CreateSeller> {
    console.log(user);
    return this.http
      .post<CreateSeller>(`${url}/register`, user, this.options)
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError(this.selleService.handleError)
      );
  }

  /**
   * Login seller
   * @param user
   * @returns
   */
  login(user: LoginSeller): Observable<LoginSeller> {
    return this.http
      .post<LoginSeller>(`${url}/login`, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((res: any) => {
          // console.log(res)
          return res;
        }),
        catchError(this.selleService.handleError)
      );
  }

  /**
   * get seller details
   * @returns
   */
  getSeller(): Observable<any> {
    return this.http.get(authUrl).pipe(
      tap((res) => {
        return res;
      }),
      catchError(this.selleService.handleError)
    );
  }

  /**
   * Edit Seller Details
   * @param details
   * @returns
   */
  editSeller(details: EditSeller): Observable<EditSeller> {
    return this.http.patch<EditSeller>(authUrl, details, this.options).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError(this.selleService.handleError)
    );
  }

  /**
   * Change password
   * @param details password form
   * @returns observable
   */
  changePassword(details: any): Observable<any> {
    return this.http
      .patch<EditSeller>(`${url}/auth/update-password`, details, this.options)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        catchError(this.selleService.handleError)
      );
  }

  /**
   * Logout
   * @returns null
   */
  logout(): Observable<any> {
    return this.http.post(`${url}/logout`, {}).pipe(
      tap((e) => {}),
      catchError(this.selleService.handleError)
    );
  }


  deleteAccount(): Observable<any>{
    return this.http.delete(authUrl, {}).pipe(
      tap((e) => {}),
      catchError(this.selleService.handleError)
    );
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private selleService: AccountSellerService
  ) {}
}
