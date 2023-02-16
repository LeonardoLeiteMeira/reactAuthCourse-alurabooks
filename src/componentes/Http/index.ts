import axios, { AxiosError } from "axios";
import { history } from "../../App";
import useGetToken from "../../hooks/useGetToken";

const http = axios.create({
    baseURL:"http://localhost:8000",
    headers:{
        Accept:"application/json",
        Content:"application/json",
    }
})

http.interceptors.request.use((config)=>{
        let token = useGetToken()
        if(token){
            config.headers.Authorization = "Bearer "+token
        }
        return config
    },
    (error:AxiosError)=>{
        return Promise.reject(error)
    }
)

http.interceptors.response.use(function (response) {
  return response;
}, function (error: AxiosError) {
  if (error.response?.status === 401) {
    history.push('/') // aqui estamos navegando de forma progamática, enviando o usuário para onde queremos.
    return Promise.reject()
  }
  return Promise.reject(error);
});

export default http; 