import { instance } from "./instance";

export const postIncomes = (body) => {
  return instance.post("/box_movement/incomes", body);
};

export const postOutcomes = (body) => {
  return instance.post("/box_movement/outcomes", body);
};

