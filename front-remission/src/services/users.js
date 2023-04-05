import { instance } from './instance';

export const getUsers = () => {
    return instance.get('/users');
}