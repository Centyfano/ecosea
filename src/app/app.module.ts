import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './components/default/default.component';
import { SharedModule } from './shared/shared.module';
import { BrandsComponent } from './components/brands/brands.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { CartComponent } from './components/cart/cart.component';
import { TokenInterceptor } from './http-interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    BrandsComponent,
    CarouselComponent,
    HighlightsComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
