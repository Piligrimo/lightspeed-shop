export interface List<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: T[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnailUrl: string;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
  thumbnailUrl: string;
}

export interface CartItem extends Product {
  quantity: () => number;
}
