import { instance } from "./instance";

export const getGeneratePDF = (id) => {
  return instance.get(`/pdf/remission/${id}`, { responseType: "blob" });
};

export const postGeneratePDFBox = (body) => {
  return instance.post(`/pdf/box`, body, { responseType: "blob" });
};
