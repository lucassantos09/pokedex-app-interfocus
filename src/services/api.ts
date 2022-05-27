import axios from "axios"

export const api = axios.create({
    baseURL:"http://10.254.203.252:3000"}
);

export default api;

