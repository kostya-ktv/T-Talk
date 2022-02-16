import { AxiosResponse } from "axios";
import API from "../api/api";
import { AuthResponse } from "../store/types";

export const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {

   return API.post<AuthResponse>('/login', {email, password})
}
export const registation = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {

   return API.post<AuthResponse>('/registration', {email, password})
}
export const logout = async (): Promise<void> => {
   return API.post('/logout')
}
