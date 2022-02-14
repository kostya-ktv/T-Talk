import { combineReducers } from "redux";
import alertsReducer from "./alerts-reducer";
import { authReducer } from "./auth-reducer";


export default combineReducers({
   auth: authReducer,
   alerts: alertsReducer
})