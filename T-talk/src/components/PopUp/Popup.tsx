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
   isDisable: boolean
}
const Popup:React.FC<Props> = ({data, action, isDisable}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className='box'>
      <Button onClick={handleOpen} disabled={isDisable}>{action}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
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
   bgcolor: 'background.paper',
   height: 'auto',
   boxShadow: 24,
   p: 2,
 };
 export default Popup;