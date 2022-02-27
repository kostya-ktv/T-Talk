import { FETCH_RECENT_ROOMS_ACTION} from "../constants";
import { RecentRoomType} from "../types";

const RECENT_ROOMS_STATE: Array<RecentRoomType> = []

const recentRoomsReducer = (state = RECENT_ROOMS_STATE, action: {type: string, payload: Array<RecentRoomType>}) => {

   switch(action.type){
      case FETCH_RECENT_ROOMS_ACTION: return [...action.payload]

      default: return state
   }
}

export default recentRoomsReducer;