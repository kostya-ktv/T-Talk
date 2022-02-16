import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { userLogout } from '../../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
//props
interface Props {
   children: React.ReactElement
}

const ContextMenu:React.FC<Props> = ({children}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<any>();

  //@ts-ignore
  const handleClick = (event) => {
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
        <MenuItem onClick={() => userLogout(dispatch)}>Logout</MenuItem>
 
      </Menu>
    </div>
  );
}
export default ContextMenu;
