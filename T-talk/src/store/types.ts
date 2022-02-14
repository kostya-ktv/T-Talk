import { combineReducers } from "redux";
import { IUser } from "../api/Model";


export type AuthStateType = {
   user: IUser
   isAuth: boolean
}
export type AlertActionType = {
   type: string,
   payload: string
}
export type AuthActionType = {
   type: string,
   payload?: any
}
export type Auth_reducer_type = typeof combineReducers;