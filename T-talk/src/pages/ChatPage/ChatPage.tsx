import { Avatar, Button, Card, CardHeader, IconButton, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect } from 'react';
import './chat.scss';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { API_CHAT } from '../../store/constants';
import { useParams } from 'react-router';
import { StoreType } from '../../store/types';
import { roomIsInStore } from '../../service/RoomService';


const ChatPage: React.FC = () => {
  let socket;
  const myRooms = useSelector((state: StoreType) => state.room)
  const roomID = useParams();
  console.log(roomID);
  
  const { room_id, name, nickname } =  roomIsInStore(myRooms, roomID) || myRooms[myRooms.length - 1]

  useEffect(() => {
    socket = io(API_CHAT);
    
    socket.emit('join', { room_id, name, nickname}, (error:any) => {
      if(error) {
        alert(error);
      }
    });

  },[])

  return (
   
    <Card className='box-chat'>
  
      <CardHeader className='header-chat' avatar={
          <Avatar sx={{ bgcolor: green[300] }} aria-label='recipe'>
            {nickname?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <ContextMenu>
              <MoreVertIcon/>
            </ContextMenu>    
          </IconButton>
        }
        title={name}
        subheader={room_id}
      />
      <Card className='window-chat'>

      </Card>
      <Card className='footer-chat'>
         <TextField
            id="outlined-textarea"
            placeholder="Message..."
            multiline
            className='input-chat'
            variant="outlined"
         />
         <Button variant="text" className='send-btn-chat'endIcon={<SendIcon/>}/>
      </Card>
      
    </Card>
    
  );
};
export default ChatPage;
