export interface IBackendRes<T> {
  error?: string | string[];
  status?: number;
  statusCode?: number;
  message?: string;
  statusText?: number | string;
  data?: T;
}

export interface IError {
  error?: string | string[];
  status?: number;
  statusCode?: number;
  message?: string;
  statusText?: number | string;
}

export interface IAccount {
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface IUser {
  email: string;
  password?: string;
  name: string;
  address: string;
}

export interface ICategory {
  id?: string;
  name?: string;
}

export interface IProduct {
  id?: string;
  name: string;
  urlName?: string;
  picture?: string;
  basePrice: number;
  discountPercentage?: number;
  stock?: number;
  description?: string;
  categories?: string[];
  createdAt?: string;
}

interface IPurchase {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  totalPrice: number;
  reviewNote: number | null;
  reviewComment: string | null;
  createdAt: string;
  product?: {
    name: string;
  };
}
