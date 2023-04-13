import { instance } from "./instance";

export const getRemission = (item = 5, page = 1, filter = "") => {
  return instance.get(`/remissions?item=${item}&page=${page}&filter=${filter}`);
}

export const postRemission = (body) => {
  return instance.post("/remissions", body);
};
