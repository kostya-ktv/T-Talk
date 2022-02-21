import { MessageType } from "../../store/types";
import './message.scss'
type Props = {
   message: MessageType,
   nickname: string
}

const Message:React.FC<Props> = ({message, nickname}) => {
   let messageStyle = '';
   if(message.type === 'user-message' && message.sender !== nickname) {
      messageStyle = 'main-user'
   } else if(message.type === 'notification') {
      messageStyle = 'main-notification'
   } else {
      messageStyle = 'main'
   }

   return(
      <div className={messageStyle}>
         { messageStyle !== 'main-notification' && 
         
         <div className="header">
            { message.sender !== nickname && 
                  <p className="user-name">
                  ✉️{message.sender}:
                  </p>
               }
            <p className="time">
               {message.time}🕖
            </p>
         
         </div>
         }
         <div className="message">
            {message.message}
         </div>
      </div>
   )
}

export default Message;