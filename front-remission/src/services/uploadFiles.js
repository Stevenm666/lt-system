import { instance } from "./instance"

export const postUploadUsers = (file) => {
    return instance.post('/upload/users', file)
}

export const postUploadProducts = file => {
    return instance.post('/upload/products', file)
}