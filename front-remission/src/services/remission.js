import { instance } from "./instance";

export const getRemission = (item = 5, page = 1, filter = "") => {
  return instance.get(`/remissions?item=${item}&page=${page}&filter=${filter}`);
};

export const getRemissionById = (id) => {
  return instance.get(`/remissions/by-id/${id}`);
};

export const postRemission = (body) => {
  return instance.post("/remissions", body);
};

export const putRemissionById = (id, body) => {
  return instance.put(`/remissions/by-id/${id}`, body);
};

export const cancelRemissionById = (id, body) => {
  return instance.put(`/remissions/cancel-id/${id}`, body);
};
