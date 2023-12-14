import axios from "axios";
import {userApi} from '../constants/Api'

export const userAxios = axios.create({
    baseURL: userApi,
})

const userAxiosInstance =axios.create({
    baseURL:userApi,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})

export default userAxiosInstance