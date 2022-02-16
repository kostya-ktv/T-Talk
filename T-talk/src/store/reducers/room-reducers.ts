import { CREATE_ROOM, JOIN_ROOM} from "../constants";
import { Room } from "../types";

const ROOM_STATE: Array<Room> = []

const roomReducer = (state = ROOM_STATE, action: {type: string, payload: Room}) => {

   switch(action.type){
      case CREATE_ROOM: return [...state, action.payload]
      case JOIN_ROOM: return state
      
      default: return state
   }
}

export default roomReducer;