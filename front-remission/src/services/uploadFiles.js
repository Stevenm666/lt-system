import { instance } from "./instance"

export const postUploadUsers = (file, rol) => {
    return instance.post(`/upload/users/${rol}`, file)
}

export const postUploadProducts = (file, rol) => {
    return instance.post(`/upload/products/${rol}`, file)
}