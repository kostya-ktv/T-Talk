
import { CHECK_AUTH_ACTION, LOGIN_ACTION, LOGOUT_ACTION, REGISTRATION_ACTION } from "../constants"
import { AuthActionType, IUser } from "../types"

const AUTH_STATE = {
   user: {} as IUser,
   isAuth: false
}

export const authReducer = (state = AUTH_STATE, action: AuthActionType) => {

   switch(action.type) {

      case LOGIN_ACTION: return {...state, user: action.payload, isAuth: true}
      case REGISTRATION_ACTION: return {...state, user: action.payload, isAuth: true}
      case LOGOUT_ACTION: return {...state, user: {}, isAuth: false}
      case CHECK_AUTH_ACTION: return {...state, user: action.payload, isAuth: true}

      default: return state
   }
}