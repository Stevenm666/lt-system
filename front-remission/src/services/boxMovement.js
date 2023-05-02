import { instance } from "./instance";

export const getBoxMovementById = (id) => {
  return instance.get(`/box_movement/${id}`);
};

export const postIncomes = (body) => {
  return instance.post("/box_movement/incomes", body);
};

export const postOutcomes = (body) => {
  return instance.post("/box_movement/outcomes", body);
};
