import { MessageType } from "../../store/types";
import './message.scss'
type Props = {
   message: MessageType,
   nickname: string
}

const Message:React.FC<Props> = ({message, nickname}) => {

   return(
      <div className={
         (message.type == "user-message" && message.sender !== nickname)
         ? 
         "main-user" 
         : 
         "main"}>
         <div className="header">
            { message.sender !== nickname && 
               <p className="user-name">
               {message.sender}
               </p>
            }
            <p className="time">
               {message.time}
            </p>
            
         </div>
         <div className="message">
            {message.message}
         </div>
      </div>
   )
}

export default Message;