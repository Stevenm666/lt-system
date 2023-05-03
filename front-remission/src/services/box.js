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
