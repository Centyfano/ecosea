export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  currency: string;
  discount_percent: number;
  quantity_in_stock: number;
  product_video: string;
  product_details: string;
  product_unit: string;
  active: string;
  minimum_order_quantity: number;
  product_category_id: string;
  cover_image: string;
  images: Array<string>;
  slug: string
}

export interface PostProduct {
  product_id: number;
  product_name: string;
  product_price: number;
  currency: string;
  discount_percent: number;
  quantity_in_stock: number;
  product_video: string;
  product_details: string;
  product_unit: string;
  active: string;
  minimum_order_quantity: number;
  product_category_id: string;
  cover_image: File;
  images: Array<string>;
}
