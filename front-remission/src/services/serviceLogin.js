import { instance } from "./instance";

export const loginService = (body) => {
    return instance.post('login', body);
}