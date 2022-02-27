import { Button, Card } from '@mui/material';
import { FC, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import ListRecentRooms from '../../components/ListRecentRooms/ListRecentRooms';
import ListRooms from '../../components/ListRooms/ListRooms';
import Popup from '../../components/PopUp/Popup';
import RoomPopupWindow from '../../components/RoomWindow/RoomModalWindow';
import { sendAlert } from '../../store/actions/alerts-actions';
import { userLogout_action } from '../../store/actions/auth-actions';
import { getRecentRooms_action, getRooms_action } from '../../store/actions/room-actions';
import { GlobalStateType } from '../../store/types';
import './room.scss';

const RoomPage: FC = () => {
  
  const dispatch = useDispatch();
  //SELECT USER
  const user = useSelector(
    (state: GlobalStateType) => state.auth.user
  );
 
  //SELECT myROOMS
  const myRooms = useSelector((state:GlobalStateType) => state.room)
  const myRecentRooms = useSelector((state:GlobalStateType) => state.recentRooms)
 
  useEffect( () => {

     //REMINDER FOR USERS WHISH EMAIL NOT ACTIVATED
    !user.isactivated &&
      setTimeout(() => {
        dispatch(
          sendAlert({
            status: 'info',
            message: 'To create rooms, your email must be verified',
          })
        );
      }, 1000)

      getRooms_action(user.id, dispatch)
      getRecentRooms_action(user.id, dispatch)
  }, []);

  return (
    <>
    <Fade>
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
      <ListRecentRooms myRecentRooms={myRecentRooms} user={user}/>
      </Fade>
    </>
  );
};

export default RoomPage;
