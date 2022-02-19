import {
  Avatar,
  Card,
  CardHeader,
} from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import './chat.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { API_CHAT } from '../../store/constants';
import { useParams } from 'react-router';
import { GlobalStateType } from '../../store/types';
import { fetchCredentials } from '../../service/Util';
import Chat from '../../components/Chat/Chat';

const ChatPage: React.FC = () => {

  const [socket, setSocket] = useState<any>();
  const myRooms = useSelector((state: GlobalStateType) => state.room);

  let credentialsParam:any = { ...useParams() };
  try {
    credentialsParam = fetchCredentials(myRooms, credentialsParam);
  } catch (error) {}

  useEffect(() => {
    setSocket(io(API_CHAT));
   },[])

  useEffect(() => {
    socket?.emit('join', {...credentialsParam, time: new Date(Date.now()).toLocaleString()});
  },[socket])

  return (
    
    <Card className='box-chat'>
      <CardHeader
        className='header-chat'
        avatar={
          <Avatar sx={{ bgcolor: green[300] }} aria-label='recipe'>
            {credentialsParam.nickname?.charAt(0)}
          </Avatar>
        }
        action={
            <ContextMenu>
              <MoreVertIcon />
            </ContextMenu>
        }
        title={`${credentialsParam.nickname} : ${credentialsParam.room}`}
        subheader={credentialsParam.id}
      />
      <Chat
        socket={socket} 
        nickname={credentialsParam.nickname} 
        room={credentialsParam.room}
        roomid={credentialsParam.id}
      />
    </Card>
  );
};
export default ChatPage;
