import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountSellerService } from '../services/account-seller.service';
import { SellerAuthService } from '../modules/seller/auth/seller-auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private inject: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const sellerService = this.inject.get(SellerAuthService);
    const token = sellerService.getToken()
    let tokenised = request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
    return next.handle(tokenised);
  }
}
