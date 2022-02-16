import { Button, Card } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListRooms from '../../components/ListRooms/ListRooms';

import Popup from '../../components/PopUp/Popup';
import RoomWindow from '../../components/RoomWindow/RoomWindow';
import { sendSuccessAlert } from '../../store/actions/alerts-actions';
import { userLogout } from '../../store/actions/auth-actions';
import { Room } from '../../store/types';

import './room.scss';
const RoomPage: FC = () => {
  const dispatch = useDispatch();
  const isMailActivated = useSelector(
    (state: any) => state.auth.user.isactivated
  );
  const myRooms = useSelector((state:any) => state.room)
  console.log(myRooms);
  

  useEffect(() => {
    !isMailActivated &&
      setTimeout(() => {
        dispatch(
          sendSuccessAlert({
            status: 'info',
            message: 'To create rooms, your mail must be verified',
          })
        );
      }, 1000);
  }, []);

  return (
    <>
      <Card className='auth-box'>

         <div className='auth-menu'>
          <Popup
            data={<RoomWindow action='Create' />}
            action='💾 Create Room'
            isDisable={!isMailActivated}
          />
        </div>

        <div className='auth-menu'>
          <Popup
            data={<RoomWindow action='Join' />}
            action='🔌 Join Room'
            isDisable={false}
          />
        </div>
        <Button onClick={() => userLogout(dispatch)} className='logout'>👋 Logout</Button>

        
      </Card>
      {myRooms.length > 0 && <ListRooms data={myRooms}/>}
         
    
    </>
  );
};

export default RoomPage;
