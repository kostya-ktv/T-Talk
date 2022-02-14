import { Avatar, Button, Card, CardHeader, IconButton, TextField } from '@mui/material';
import { red } from '@mui/material/colors';
import * as React from 'react';
import './chat.scss';

import SendIcon from '@mui/icons-material/Send';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContextMenu from '../../components/ContextMenu/ContextMenu';

const ChatPage: React.FC = () => {
  return (
   
    <Card className='box-chat'>
  
      <CardHeader className='header-chat' avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <ContextMenu>
              <MoreVertIcon/>
            </ContextMenu>
            

            
          </IconButton>
        }
        title='Shrimp and Chorizo Paella'
        subheader='September 14, 2016'
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
