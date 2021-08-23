import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { SellerAccountComponent } from './seller-account.component';
import { SellerRecentComponent } from './seller-recent/seller-recent.component';
import { SellerInboxComponent } from './seller-inbox/seller-inbox.component';
import { SellerReviewsComponent } from './seller-reviews/seller-reviews.component';
import { SellerCreditComponent } from './seller-credit/seller-credit.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellerAddressComponent } from './seller-address/seller-address.component';
import { SellerPasswordComponent } from './seller-password/seller-password.component';
import { SellerStockComponent } from './seller-stock/seller-stock.component';
import { SellerSalesComponent } from './seller-sales/seller-sales.component';
import { SellerChatComponent } from './seller-inbox/seller-chat/seller-chat.component';
import { SellerChatListComponent } from './seller-inbox/seller-chat-list/seller-chat-list.component';
import { SellerAccountDeleteComponent } from './seller-account-delete/seller-account-delete.component';
import { SellerInvoicesComponent } from './seller-invoices/seller-invoices.component';
import { SellerInvoiceTableComponent } from './seller-invoices/seller-invoice-table/seller-invoice-table.component';
import { SellerViewInvoiceComponent } from './seller-invoices/seller-view-invoice/seller-view-invoice.component';
import { SellerProductsComponent } from './seller-products/seller-products.component';
import { SellerSalesChartComponent } from './charts/seller-sales-chart/seller-sales-chart.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateProductComponent } from './seller-products/create-product/create-product.component';
import { ProductDetailsComponent } from './seller-products/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: SellerAccountComponent },
  { path: 'sales', component: SellerSalesComponent },
  {
    path: 'inbox',
    component: SellerInboxComponent,
    children: [
      { path: '', component: SellerChatListComponent },
      { path: 'chat', component: SellerChatComponent },
    ],
  },
  { path: 'reviews', component: SellerReviewsComponent },
  { path: 'credit', component: SellerCreditComponent },
  { path: 'recent', component: SellerRecentComponent },
  { path: 'profile', component: SellerDetailsComponent },
  { path: 'address', component: SellerAddressComponent },
  { path: 'password', component: SellerPasswordComponent },
  { path: 'invoice', component: SellerInvoicesComponent },
  {
    path: 'products',
    children: [
      { path: '', component: SellerProductsComponent },
      { path: 'detail/:slug', component: ProductDetailsComponent },
      { path: 'create', component: CreateProductComponent },
    ],
  },
  { path: 'delete', component: SellerAccountDeleteComponent },
];

@NgModule({
  declarations: [
    SellerAccountComponent,
    SellerRecentComponent,
    SellerInboxComponent,
    SellerReviewsComponent,
    SellerCreditComponent,
    SellerDetailsComponent,
    SellerAddressComponent,
    SellerPasswordComponent,
    SellerStockComponent,
    SellerSalesComponent,
    SellerChatComponent,
    SellerChatListComponent,
    SellerAccountDeleteComponent,
    SellerInvoicesComponent,
    SellerViewInvoiceComponent,
    SellerInvoiceTableComponent,
    SellerProductsComponent,
    SellerSalesChartComponent,
    CreateProductComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ChartsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class SellerAccountModule {}
