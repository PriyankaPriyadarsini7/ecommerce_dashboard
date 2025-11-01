import axiosClient from "./axiosClient";
import type { Product } from "../types/productTypes";

export const productApi = {
  getAll: (limit = 200, skip = 0) =>
    axiosClient.get(`/products?limit=${limit}&skip=${skip}`),
  getById: (id: number) => axiosClient.get(`/products/${id}`),
  add: (product: Partial<Product>) =>
    axiosClient.post("/products/add", product),
  update: (id: number, product: Partial<Product>) =>
    axiosClient.put(`/products/${id}`, product),
  remove: (id: number) => axiosClient.delete(`/products/${id}`),
};
