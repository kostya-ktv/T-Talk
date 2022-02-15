import { REMOVE_ALERT_ACTION, SUCCESS_ALERT_ACTION } from "../constants"
import { AlertTypeOptions } from "../types"

export const sendSuccessAlert = (message: {status: AlertTypeOptions, message: string}) => ({
   type: SUCCESS_ALERT_ACTION,
   payload: message
})
export const removeAlert = () => ({
   type: REMOVE_ALERT_ACTION,
})