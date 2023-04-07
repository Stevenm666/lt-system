import { instance } from "./instance";

export const getProducts = (item, page, filter) => {
    return instance.get(`/products?item=${item}&page=${page}&filter=${filter}`);
};

export const postProducts = (body) => {
    return instance.post('/products', body);
};

export const putProducts = (id, body) => {
    return instance.put(`/products/${id}`, body);
};

export const deleteProducts = (id) => {
    return instance.delete(`/products/${id}`);
}