import axios from "axios";
import {teacherApi} from '../constants/Api'
const teacherAxiosInstance =axios.create({
    baseURL:teacherApi
})

export default teacherAxiosInstance