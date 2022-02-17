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
//USER LOGOUT

export const userLogout_action = async(dispatch: Dispatch) => {
   try {
      await logout().then(() => dispatch({ type: LOGOUT_ACTION }))
      localStorage.removeItem('token');
   } catch (error) {
      console.log(error);    
   }
}
//CHECKING USER AUTH WITH STARTING APP
export const checkAuth_action = async () => {
   try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      return response;
   } catch (error) {
      localStorage.removeItem('token');
      console.log(error);  
   }
   
}

