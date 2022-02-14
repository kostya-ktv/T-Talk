import { ERROR_ALERT_ACTION } from "../constants";
import { AlertActionType } from "../types";

const ALERTS_STATE = {
   type: '',
   message: ''
}

const alertsReducer = (state = ALERTS_STATE, action: AlertActionType) => {
   switch(action.type){
      case ERROR_ALERT_ACTION: return state;
      default: return state;
   }
}

export default alertsReducer;