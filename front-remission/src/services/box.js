import { instance } from "./instance";

export const getBoxByDate = (date) => {
  return instance.get(`/box/${date}`);
};

export const postOpenBox = (body) => {
  return instance.post("/box/open", body);
};

export const putOpenBoxToClose = (id, body) => {
  return instance.put(`/box/to-close/${id}`, body);
};

export const putOpenBox = (id, body) => {
  return instance.put(`/box/${id}`, body);
}

export const getInitialValues = (id) => {
  return instance.get(`/box/getValues/${id}`);
}