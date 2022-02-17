import { FETCH_ROOMS_ACTION, JOIN_ROOM_ACTION} from "../constants";
import { RoomResponseType } from "../types";

const ROOM_STATE: Array<RoomResponseType> = []

const roomReducer = (state = ROOM_STATE, action: {type: string, payload: Array<RoomResponseType>}) => {

   switch(action.type){
      case JOIN_ROOM_ACTION: return state
      case FETCH_ROOMS_ACTION: return [...action.payload]

      default: return state
   }
}

export default roomReducer;