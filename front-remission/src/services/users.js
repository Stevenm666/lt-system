import { instance } from './instance';

export const getUsers = (item = 5, page = 1, filter = "") => {
    return instance.get(`/users?item=${item}&page=${page}&filter=${filter}`);
}