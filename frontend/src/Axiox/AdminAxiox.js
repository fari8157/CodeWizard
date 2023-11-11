import axios from "axios";
import {adminApi} from '../constants/Api'
const userAxiosInstance =axios.create({
    baseURL:adminApi
})

export default userAxiosInstance