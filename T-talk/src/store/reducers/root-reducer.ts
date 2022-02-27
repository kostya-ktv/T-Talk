import { combineReducers } from "redux";
import alertsReducer from "./alerts-reducer";
import { authReducer } from "./auth-reducer";
import recentRoomsReducer from "./recent-rooms-reducer";
import roomReducer from "./room-reducers";


export default combineReducers({
   auth: authReducer,
   alerts: alertsReducer,
   room: roomReducer,
   recentRooms: recentRoomsReducer
})