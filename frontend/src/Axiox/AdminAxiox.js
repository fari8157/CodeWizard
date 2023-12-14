import axios from "axios";
import {adminApi} from '../constants/Api'

export const adminAxios = axios.create({
    baseURL: adminApi,
})

const adminAxiosInstance =axios.create({
    baseURL:adminApi,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})

export default adminAxiosInstance