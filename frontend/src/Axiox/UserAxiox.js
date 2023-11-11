import axios from "axios";
import {userApi} from '../constants/Api'
const userAxiosInstance =axios.create({
    baseURL:userApi
})

export default userAxiosInstance