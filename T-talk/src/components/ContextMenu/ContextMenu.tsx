import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userLogout_action } from '../../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Dispatch } from 'redux';
import { Socket } from 'socket.io-client';

//props
interface Props {
   children: React.ReactElement,
   socket: Socket
}

const ContextMenu:React.FC<Props> = ({children, socket}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<Dispatch>();

  const navigate = useNavigate(); 
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
   setAnchorEl(null);
 };
 const closeSocket = () => {
  socket?.emit('close');  
 }
 
  return (
    <div>   
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        {children}
      </Button>  
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}     
        >
        <MenuItem onClick={() => {
          closeSocket()
          navigate(`/room`)
        }}>Close Room</MenuItem>
        <MenuItem onClick={() => {
          closeSocket()
          userLogout_action(dispatch)
          navigate(`/`)
          }}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default ContextMenu;
