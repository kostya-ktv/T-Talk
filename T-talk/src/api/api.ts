import axios from "axios";
import { API_URL } from "../constants";


const API = axios.create({
   withCredentials: true,
   baseURL: API_URL
})

//INTERCEPTOR FOR REQUEST SET 
API.interceptors.request.use(config => {
   //@ts-ignore
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
   return config;
})

export default API;