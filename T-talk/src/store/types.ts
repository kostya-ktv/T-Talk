import { combineReducers } from "redux"

export type StoreType = {
   auth: AuthStateType,
   alerts: any,
   room: Array<RoomResponseType>
}
export type AuthResponse = {
   accessToken: string;
   refreshToken: string;
   user: IUser;
}

export type IUser = {
   id: number;
   email: string;  
   password: string;
   isActivated: boolean;
   activationlink: string;
}

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


export type RoomActionType = {
   type: string,
   payload?: Object
}

export type RoomResponseType = {
   id: number, 
   name: string, 
   room_id: string,
   iuser_id: number,
   nickname: string
}
