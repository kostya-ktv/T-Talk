import { Button, Card, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Socket } from "socket.io-client";
import { FC, useEffect, useState } from "react";
import ListMessages from "../ListMessages/ListMessages";
import { MessageType } from "../../store/types";
import PopOver from "../PopOver/PopOver";
import { showTypingSpan } from "../../service/Util";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

type Props = {
   socket: Socket,
   nickname: string,
   room?: string | undefined,
   roomid?: string | undefined
}

const Chat:FC<Props> = ({socket, nickname, room, roomid}) => {
   const [currentMessage, setCurrentMessage] = useState('');
   const [currentUsers, setCurrentUsers] = useState<Array<string>>([]);
   const [messages, setMessages] = useState<Array<MessageType>>([]);
   const [isTyping, setIsTyping] = useState<boolean>(false);
   const [emojiVisible, setEmojiVisible] = useState<boolean>(false);

//SEND MSG
   const sendMessage = () => {  
      if(currentMessage) {
         const messageData = {
            roomid: roomid,
            message: currentMessage,
            nickname: nickname,
            time: new Date(Date.now()).toLocaleTimeString('en-US', {hour12: false})
         }
          socket?.emit('sendMessage', messageData);  
          setCurrentMessage('')   
      }
   }
//EFFECT FOR EVENT USER MESSAGE
 useEffect( ()=> {
   socket?.on('receiveMessage', ({roomid, message, nickname, time, users}) => { 
  
      const msg: MessageType = {
        message: message,
        sender: nickname,
        time: time,
        type: 'user-message'
      }
      setMessages(prev => [...prev, msg])  
      setCurrentUsers(users) 
   })
 },[socket])
//EFFECT FOR EVENT JOINING CHAT
 useEffect( ()=> {
   socket?.on('user-join', ({id, nickname, room, time, users}) => { 

    const msg: MessageType = {
      message: `🔔 ${nickname} join chat`,
      sender: 'Server',
      time: time,
      type: 'notification'
    }
      setMessages(prev => [...prev, msg])    
      setCurrentUsers(users)    
      
   })
 },[socket])
//DISCONNECT
 useEffect( ()=> {
   //@ts-ignore
   socket?.on('user-disconnect', ({disconnectedUser, users}) => { 
    const msg: MessageType = {
      message: `🔔 ${disconnectedUser[0].nickname} left chat...`,
      sender: 'Server',
      time: '',
      type: 'notification'
    }
      setMessages(prev => [...prev, msg]) 
      setCurrentUsers(users)               
   })
 },[socket])
//LEAVE TAB
 useEffect( ()=> {
   //@ts-ignore
   socket?.on('user-close', ({disconnectedUser, users}) => { 
    const msg: MessageType = {
      message: `🔔 ${disconnectedUser[0].nickname} left chat...`,
      sender: 'Server',
      time: '',
      type: 'notification'
    }
      setMessages(prev => [...prev, msg]) 
      setCurrentUsers(users)               
   })
 },[socket])
//TYPING
 useEffect( ()=> {
   //@ts-ignore
   socket?.on('typingAlert', () => showTypingSpan(setIsTyping))
 },[socket])

    
  return (
    <>
      <PopOver currentUsers={currentUsers} isTyping={isTyping}/>

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
          onChange={(e) => {
            socket.emit('typing', {roomid})
            setCurrentMessage(e.target.value)}}
          onKeyPress={(event) => { 
            if(event.key === "Enter"){
              sendMessage()
              event.preventDefault();
            }}}
        />
        {emojiVisible && <EmojiPicker currentMessage={currentMessage} setCurrentMessage={setCurrentMessage}/>}
        <Button
          variant='text'
          className='send-btn-chat emo-icon'
          endIcon={<InsertEmoticonIcon />}
          onClick={()=>setEmojiVisible(!emojiVisible)}          
        />
        <Button
          variant='text'
          className='send-btn-chat'
          endIcon={<SendIcon/>}
          onClick={sendMessage}          
        />
      </Card>
    </>
  );
};

export default Chat;
