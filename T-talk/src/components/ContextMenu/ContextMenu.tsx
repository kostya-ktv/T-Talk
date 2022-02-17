import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userLogout_action } from '../../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
//props
interface Props {
   children: React.ReactElement
}

const ContextMenu:React.FC<Props> = ({children}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();

  const navigate = useNavigate(); 
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
   setAnchorEl(null);
 };

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

        <MenuItem onClick={() => navigate(`/room`)}>Close Room</MenuItem>
        <MenuItem onClick={() => userLogout_action(dispatch)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default ContextMenu;
