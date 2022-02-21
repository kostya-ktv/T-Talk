import { FC, useEffect, useRef } from "react";
import { MessageType } from "../../store/types";
import Message from "../Message/Message";
import './listMessages.scss';
//@ts-ignore
import sound from '../../Assets/notification.mp3'

type Props = {
   messages: Array<MessageType>,
   currentUser: string
}
const ListMessages:FC<Props> = ({messages, currentUser}) => {
   //SCROLL CHAT TO BOTTOM
   const messagesEndRef = useRef(null);
   const scrollToBottom = () => {
      //@ts-ignore
     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
   };
   useEffect(() => {
      scrollToBottom()
      playNotificationSound();
   }, [messages]);

   //MESSAGE SOUND
   const playNotificationSound = () => {
      new Audio(sound).play();
   }
   return (
      <div className="list">

         {messages.map((message, index) => {
            
            return <Message message={message} nickname={currentUser} key={index}/>
         })}

     <div ref={messagesEndRef} />
         
      </div>
   )
}

export default ListMessages;