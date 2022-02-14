import axios from "axios";

import { AuthResponse } from "../../api/Model";
import { API_URL } from "../constants";
import { login, logout, registation } from "../../service/AuthService"

export const login_action = async(email: string, password: string) => {
   try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response;
   } catch (error) {
      console.log(error);    
   }
}
export const registation_action = async(email: string, password: string) => {
   try {
      const response = await registation(email, password);
      localStorage.setItem('token', response.data.accessToken);  
      return response;
   } catch (error) {
      console.log(error);    
   }
}
export const logout_action = async() => {
   try {
      const response = await logout();
      localStorage.removeItem('token');
      return response;
   } catch (error) {
      console.log(error);    
   }
}
export const checkAuth = async () => {
   try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      return response;
   } catch (error) {
      console.log(error);  
   }
   
}

