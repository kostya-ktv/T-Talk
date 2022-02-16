import axios from "axios";

import { API_URL, LOGOUT_ACTION } from "../constants";
import { login, logout, registation } from "../../service/AuthService"
import { AuthResponse } from "../types";
import { Dispatch } from "redux";

export const login_action = async(email: string, password: string) => {

   try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response;
   } catch (error) {
      localStorage.removeItem('token');
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
export const userLogout = (dispatch: Dispatch) => {
   logout_action().then((data) => dispatch({ type: LOGOUT_ACTION }))
 };

const logout_action = async() => {
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
      localStorage.removeItem('token');
      console.log(error);  
   }
   
}

