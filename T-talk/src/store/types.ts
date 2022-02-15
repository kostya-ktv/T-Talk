import { combineReducers } from "redux"
import { IUser } from "../api/Model"


export type AuthStateType = {
   user: IUser
   isAuth: boolean
}

export type AuthActionType = {
   type: string,
   payload?: Object
}
export type Auth_reducer_type = typeof combineReducers


export type AlertActionType = {
   type: string,
   payload?: Object
}
export type AlertTypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';