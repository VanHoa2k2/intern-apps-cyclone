import axios from "./axios-customize";
import {
  IAccount,
  IBackendRes,
  ICategory,
  IError,
  IProduct,
} from "../types/backend";
import { useAppSelector } from "../redux/hook";
import { AxiosResponse } from "axios";
import { AnyIfEmpty } from "react-redux";

// account api
export const callLogin = (username: string, password: string) => {
  return axios.post("login", {
    email: username,
    password,
  });
};

export const callRegister = (
  email: string,
  password: string,
  name: string,
  address: string
) => {
  return axios.post("user", {
    email,
    password,
    name,
    address,
  });
};

export const callLogout = (refreshToken: string) => {
  return axios.post("logout", { refreshToken });
};

// export const callRefreshToken = () => {
//   const refreshToken = localStorage.getItem("refresh_token");
//   return axios.post("refresh", {
//     refreshToken,
//   });
// };

export const callFetchUser = async () => {
  try {
    const res = await axios.get("user");

    return res;
  } catch (error) {
    throw error;
  }
};

// category api
export const callFetchCategory = (query: string) => {
  return axios.get(`/category?${query}`);
};

export const callCreateCategory = (name: string) => {
  return axios.post("category", { name });
};

export const callUpdateCategory = (id: string, name: string) => {
  return axios.patch<IBackendRes<ICategory>>(`category/${id}`, { name });
};

export const callDeleteCategory = (id: string) => {
  return axios.delete(`category/${id}`);
};

// product api

export const callFetchProduct = (query: string) => {
  return axios.get(`/product?${query}`);
};

export const callCreateProduct = (product: IProduct) => {
  return axios.post("product", { ...product });
};

export const callUpdateProduct = (product: IProduct, id: string) => {
  return axios.patch(`product/${id}`, { ...product });
};

export const callFetchProductById = (id: string) => {
  return axios.get(`/product/id/${id}`);
};

export const callFetchProductByUrlName = (UrlName: string) => {
  return axios.get(`/product/${UrlName}`);
};

export const callDeleteProduct = (id: string) => {
  return axios.delete(`product/${id}`);
};

export const callUpdateProductPicture = (file: any, id: string) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  return axios({
    method: "patch",
    url: `product/picture/${id}`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Purchase API
export const callCreatePurchase = (productId: string, amount: number) => {
  return axios.post("purchase", { productId, amount });
};

export const callFetchPurchase = (query: string) => {
  return axios.get(`/purchase?${query}`);
};

export const callFetchPurchaseAdmin = (query: string) => {
  return axios.get(`/purchase/admin?${query}`);
};

export const callReviewPurchaseProduct = (
  id: string,
  reviewNote: number,
  reviewComment: string
) => {
  return axios.patch(`/purchase/review/${id}`, {
    reviewNote,
    reviewComment,
  });
};

export const callDeletePurchase = (id: string) => {
  return axios.delete(`purchase/${id}`);
};
