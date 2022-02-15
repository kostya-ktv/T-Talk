import axios from "axios";
import { API_URL } from "../store/constants";
import { AuthResponse } from "./Model";


const API = axios.create({
   withCredentials: true,
   baseURL: API_URL
})

//INTERCEPTOR FOR REQUEST SET 
API.interceptors.request.use((config: any) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
   return config;
})

//INTERCEPTOR FOR REWRITING TOKEN

API.interceptors.response.use(config => {
   return config;
   //check erorrs from server repsonse

}, async(error) => {
   const originalRequest = error.config;
   if(error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials: true})
      //with the successful refresh response, write a new access token in LS
      localStorage.setItem('token', response.data.accessToken);
      //repeat the main request
      return API.request(originalRequest);
   }
   throw error;
})

export default API;