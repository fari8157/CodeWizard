import axios from "axios";
import {adminApi} from '../constants/Api'
const adminAxiosInstance =axios.create({
    baseURL:adminApi
})

export default adminAxiosInstance