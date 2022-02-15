import { Card} from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../../components/PopUp/Popup';
import RoomWindow from '../../components/RoomWindow/RoomWindow';
import { sendSuccessAlert } from '../../store/actions/alerts-actions';
import './room.scss'
const RoomPage: FC = () => {
  const dispatch = useDispatch();
  const isMailActivated = useSelector((state: any) => state.auth.user.isactivated);

  useEffect(() => {
   !isMailActivated && setTimeout(() => {
      dispatch(sendSuccessAlert({ status: 'info', message: 'To create rooms, your mail must be verified' }));
    }, 1000);
  }, []);

  return (
     <>
     
  <Card className='box room-window'>
     
     <div className='element'>
      <h1>#</h1>
       <Popup data={<RoomWindow action='Create'/>} action='Create Room' isDisable={!isMailActivated}/> 
     </div>

     <div className='element'>
      <h1>#</h1>

        <Popup data={<RoomWindow action='Join'/>} action='Join Room' isDisable={false}/>
     </div>
          
        
   </Card>
   </>
  );
};

export default RoomPage;
