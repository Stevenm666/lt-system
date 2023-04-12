import { instance } from "./instance";

export const getProducts = (item, page, filter, status) => {
  return instance.get(
    `/products?item=${item}&page=${page}&status=${status}&filter=${filter}`
  );
};

export const postProducts = (body) => {
  return instance.post("/products", body);
};

export const putProducts = (id, body) => {
  return instance.put(`/products/${id}`, body);
};

export const deleteProducts = (id, rol) => {
  return instance.delete(`/products/${id}/${rol}`);
};

export const activeProduct = (id, body) => {
  return instance.put(`/products/${id}/active`, body);
};
