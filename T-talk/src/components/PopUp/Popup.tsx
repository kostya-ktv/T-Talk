import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ReactElement } from 'react';
import { Card } from '@mui/material';
import './popup.scss'

interface Props{ 
   data: ReactElement
   action: string
}
const Popup:React.FC<Props> = ({data, action}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className='box'>
      <Button variant="outlined" onClick={handleOpen} className="btn">{action}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        {/* Inputs box */}
        <Box sx={style}>
           {data}
        </Box>
      </Modal>
    </Card>
  );
}
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 'auto',
   bgcolor: 'rgba(255, 255, 255, 0.9)',
   height: 'auto',
   boxShadow: 24,
   p: 3,
 };
 export default Popup;