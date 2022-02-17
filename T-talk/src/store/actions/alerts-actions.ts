import { REMOVE_ALERT_ACTION, ALERT_ACTION } from "../constants"
import { AlertTypeOptions } from "../types"

export const sendAlert = (message: {status: AlertTypeOptions, message: string}) => ({
   type: ALERT_ACTION,
   payload: message
})
export const removeAlert = () => ({
   type: REMOVE_ALERT_ACTION,
})