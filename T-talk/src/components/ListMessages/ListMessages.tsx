import { FC } from "react";
import { MessageType } from "../../store/types";
import Message from "../Message/Message";
import './listMessages.scss'
type Props = {
   messages: Array<MessageType>,
   currentUser: string
}
const ListMessages:FC<Props> = ({messages, currentUser}) => {

   return (
      <div className="list">

         {messages.map((message, index) => {
            return <Message message={message} nickname={currentUser} key={index}/>
         })}
         
      </div>
   )
}

export default ListMessages;