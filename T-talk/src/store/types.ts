import { combineReducers } from "redux"


//STATE TYPES
export type GlobalStateType = {
   auth: AuthStateType,
   alerts: AlertStateType,
   room: Array<RoomResponseType>,
   recentRooms: Array<RecentRoomType>
}
export type AuthStateType = {
   user: IUser
   isAuth: boolean
}
export type AlertStateType = {

   status: string,
   message: string 
}


// AUTH TYPES

export type AuthResponse = {
   accessToken: string;
   refreshToken: string;
   user: IUser;
}
export type AuthActionType = {
   type: string,
   payload?: Object
}
export type Auth_reducer_type = typeof combineReducers


//ALERT TYPES

export type AlertActionType = {
   type: string,
   payload?: Object
}
export type AlertTypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';


//ROOM TYPES
export type RoomActionType = {
   type: string,
   payload?: Object
}
export type RoomResponseType = {
   id: number, 
   name: string, 
   room_id: string,
   iuser_id: number,
   nickname: string,
}
export type RecentRoomType = {
   id: number,
   nickname: string,
   userid: number,
   roomid: string,
   name: string
}

//OTHER 
export type IUser = {
   id: number;
   email: string;  
   password: string;
   isactivated: boolean;
   activationlink: string;
}

export type MessageType ={ 
   message: string,
   sender: string,
   type: 'user-message' | 'notification',
   time: string,
}
