import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'x-access-api-key': import.meta.env.VITE_API_KEY}
});
