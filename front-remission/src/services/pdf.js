import { instance } from "./instance";

export const getGeneratePDF = (id) => {
  return instance.get(`/pdf/remission/${id}`, { responseType: "blob" });
};
