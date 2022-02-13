import { IUser } from "../../api/Model"

const AUTH_STATE = {
   user: {} as IUser,
   isAuth: false 
}

export const authReducer = (state = AUTH_STATE, action: any) => {
   switch(action.type) {
      case 'LOGIN_ACTION': return {...state, user: action.payload, isAuth: true}
      case 'REGISTRATION_ACTION_ACTION': return {...state, user: action.payload}
      case 'LOGOUT': return {user: {}, isAuth: false}
      case 'CHECK_AUTH': return {...state, user: action.payload, isAuth: true}
      default: return state
   }
}