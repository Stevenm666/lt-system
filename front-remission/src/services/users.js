import { instance } from "./instance";

export const getUsers = (item = 5, page = 1, filter = "") => {
  return instance.get(`/users?item=${item}&page=${page}&filter=${filter}`);
};

export const getUserByDocument = (type, document) => {
  return instance.get(
    `/users/by_document?type_identy=${type}&identy=${document}`
  );
};

export const getUserByDocumentOnly = (document, type) => {
  return instance.get(`/users/by_document_only?identy=${document}&type=${type}`);
};
