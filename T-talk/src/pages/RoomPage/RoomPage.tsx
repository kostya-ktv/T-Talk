import { Button, Card } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListRooms from '../../components/ListRooms/ListRooms';
import Popup from '../../components/PopUp/Popup';
import RoomPopupWindow from '../../components/RoomWindow/RoomModalWindow';
import { sendAlert } from '../../store/actions/alerts-actions';
import { userLogout_action } from '../../store/actions/auth-actions';
import { getRooms_action } from '../../store/actions/room-actions';
import './room.scss';

const RoomPage: FC = () => {

  const dispatch = useDispatch();
  //SELECT USER
  const user = useSelector(
    (state: any) => state.auth.user
  );
  //SELECT myROOMS
  const myRooms = useSelector((state:any) => state.room)

  
  useEffect( () => {
     //REMINDER FOR USERS WHISH EMAIL NOT ACTIVATED
    !user.isactivated &&
      setTimeout(() => {
        dispatch(
          sendAlert({
            status: 'info',
            message: 'To create rooms, your mail must be verified',
          })
        );
      }, 1000)
      getRooms_action(user.id, dispatch)
  }, []);

  return (
    <>
      <Card className='auth-box'>
         {user.isactivated && 
            <div className='auth-menu'>
               <Popup
                  data={<RoomPopupWindow action='Create' />}
                  action='💾 Create Room'

               />
            </div>
        }
        <div className='auth-menu'>
          <Popup
            data={<RoomPopupWindow action='Join' />}
            action='🔌 Join Room'
          />
        </div>
        <Button onClick={() => userLogout_action(dispatch)} className='logout'>👋 Logout</Button>     
      </Card>
      <ListRooms rooms={myRooms} user={user}/>
    </>
  );
};

export default RoomPage;
