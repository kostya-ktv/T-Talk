import { ERROR_ALERT_ACTION } from "../constants"

const sendErrorAlert = (message: string) => ({
   type: ERROR_ALERT_ACTION,
   payload: message
})