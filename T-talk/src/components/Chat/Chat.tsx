import { Button, Card, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Socket } from "socket.io-client";
import { FC, useEffect, useState } from "react";
import ListMessages from "../ListMessages/ListMessages";
import { MessageType } from "../../store/types";

type Props = {
   socket: Socket,
   nickname: string,
   room?: string | undefined,
   roomid?: string | undefined
}

const Chat:FC<Props> = ({socket, nickname, room, roomid}) => {
   const [currentMessage, setCurrentMessage] = useState('');
   const [messages, setMessages] = useState<Array<MessageType>>([]);

   const sendMessage = () => {  
      if(currentMessage) {
         const messageData = {
            roomid: roomid,
            message: currentMessage,
            nickname: nickname,
            time: new Date(Date.now()).toLocaleString()
         }
          socket?.emit('sendMessage', messageData);  
          setCurrentMessage('')   
      }
   }
//EFFECT FOR EVENT USER MESSAGE
 useEffect( ()=> {
   socket?.on('receiveMessage', ({roomid, message, nickname, time}) => { 
  
      const msg: MessageType = {
        message: message,
        sender: nickname,
        time: time,
        type: 'user-message'
      }
      setMessages(prev => [...prev, msg])  
   })
 },[socket])

//EFFECT FOR EVENT JOINING CHAT
 useEffect( ()=> {
   socket?.on('user-join', ({id, nickname, room, time}) => { 

    const msg: MessageType = {
      message: `🔔 ${nickname} join`,
      sender: 'Server',
      time: time,
      type: 'notification'
    }
      setMessages(prev => [...prev, msg])    
   })
 },[socket])

    
  return (
    <>

      <Card className='window-chat'>
        {messages.length > 0 && <ListMessages messages={messages} currentUser={nickname}/>}
      </Card>
      <Card className='footer-chat'>
        <TextField
          maxRows={2}
          id='outlined-textarea'
          placeholder='Message...'
          multiline={true}
          className='input-chat'
          variant='outlined'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => { 
            if(event.key === "Enter"){
              sendMessage()
              event.preventDefault();
            }
          }}
          
        />
        <Button
          variant='text'
          className='send-btn-chat'
          endIcon={<SendIcon />}
          onClick={sendMessage}
          
        />
      </Card>
    </>
  );
};

export default Chat;
