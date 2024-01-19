import { useEffect } from "react";
import { useSelector } from "react-redux";
import userAxiosInstance from "../Axiox/UserAxiox";
import teacherAxiosInstance from "../Axiox/TeacherAxiox";
import adminAxiosInstance from "../Axiox/AdminAxiox";


const useAxiosPrivate = () =>{
    const authState = useSelector((state)=> state.Client)

    useEffect(()=>{
        const userRequestIntercept = userAxiosInstance.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = authState.Token
                    config.headers['userRole'] = authState.role
                }

                return config;
            }, (error) => Promise.reject(error)
        )

        const teacherRequestIntercept = teacherAxiosInstance.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = authState.Token
                    config.headers['userRole'] = authState.role
                }

                return config;
            }, (error) => Promise.reject(error)
        )

        const adminRequestIntercept = adminAxiosInstance.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = authState.Token
                    config.headers['userRole'] = authState.role
                }

                return config;
            }, (error) => Promise.reject(error)
        )

        return ()=>{
            userAxiosInstance.interceptors.request.eject(userRequestIntercept)
            teacherAxiosInstance.interceptors.request.eject(teacherRequestIntercept)
            adminAxiosInstance.interceptors.request.eject(adminRequestIntercept)
        }

    },[authState])

    return {
        userAxiosInstance,
        teacherAxiosInstance,
        adminAxiosInstance
    }
}

export default useAxiosPrivate