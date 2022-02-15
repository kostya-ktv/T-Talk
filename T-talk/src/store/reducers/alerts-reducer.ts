import { REMOVE_ALERT_ACTION, SUCCESS_ALERT_ACTION } from "../constants";

const ALERTS_STATE = {
   status: '',
   message: ''
}

const alertsReducer = (state = ALERTS_STATE, action: {type: string, payload: typeof ALERTS_STATE}) => {

   switch(action.type){
      case SUCCESS_ALERT_ACTION: return {...state, status: action.payload.status, message: action.payload.message}
      case REMOVE_ALERT_ACTION: return {...state, status: '', message: ''};
      
      default: return state
   }
}

export default alertsReducer;