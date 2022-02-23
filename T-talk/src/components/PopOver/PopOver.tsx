import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import './popover.scss'
type Props = {
   currentUsers: Array<string>
}

const PopOver:React.FC<Props> = ({currentUsers}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div style={{backgroundColor: '#EFFFE2'}}>
      <Button className='btn-online' aria-describedby={id} variant="contained" onClick={handleClick}>
        online: {currentUsers.length}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <span className='modal-online'>{currentUsers.map((el, i) => {
          return(<p style={{width: "auto", paddingRight: '1vw'}} key={i}>🔹{el}</p>)
        })}</span>
      </Popover>
    </div>
  );
}
export default PopOver;
