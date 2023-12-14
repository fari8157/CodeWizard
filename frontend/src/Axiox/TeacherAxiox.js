import axios from "axios";
import {teacherApi} from '../constants/Api'

export const teacherAxios = axios.create({
    baseURL: teacherApi,
})

const teacherAxiosInstance =axios.create({
    baseURL:teacherApi,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})

export default teacherAxiosInstance