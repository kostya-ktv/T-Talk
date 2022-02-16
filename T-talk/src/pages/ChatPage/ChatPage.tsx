import { Avatar, Button, Card, CardHeader, IconButton, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';
import './chat.scss';

import SendIcon from '@mui/icons-material/Send';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import { useParams } from 'react-router';

const ChatPage: React.FC = () => {
  const {id, room, user} = useParams();


  return (
   
    <Card className='box-chat'>
  
      <CardHeader className='header-chat' avatar={
          <Avatar sx={{ bgcolor: green[300] }} aria-label='recipe'>
            {user?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <ContextMenu>
              <MoreVertIcon/>
            </ContextMenu>    
          </IconButton>
        }
        title={room}
        subheader={id}
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
