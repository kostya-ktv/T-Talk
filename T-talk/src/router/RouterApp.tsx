import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';
import RoomPage from '../pages/RoomPage/RoomPage';
import { checkAuth_action } from '../store/actions/auth-actions';
import { CHECK_AUTH_ACTION } from '../store/constants';
import { removeAlert } from '../store/actions/alerts-actions';
import ChatPage from '../pages/ChatPage/ChatPage';
import { getRooms_action } from '../store/actions/room-actions';
import Toast, { showToast } from '../components/Toast/Toast';
import { GlobalStateType } from '../store/types';

const RouterApp: React.FC = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state: GlobalStateType) => state.auth);
  const alertMessage = useSelector((state: GlobalStateType) => state.alerts);

  const checkUserAuth = async() => {
    await checkAuth_action().then(async (data) => {

      if (data !== undefined){
        await getRooms_action(data.data.user.id,dispatch)
          dispatch({
            type: CHECK_AUTH_ACTION,
            payload: data?.data.user,
          });
        }
    });
  };
  //when opening the app, checking the token in storage
  useEffect(() => {
    localStorage.getItem('token') && checkUserAuth();
  }, []);

  //show alert message
  if (alertMessage.message.length) {
    showToast(alertMessage)
    //removing alert from store after the showing
    dispatch(removeAlert());
  }

    return (
      <div>
        <Toast/>
        <Routes>
          {/* IF USER DOESNT AUTH WITH NO ACTIVATED EMAIL*/}
          {
            !auth.isAuth &&
            <>
              <Route path='/' element={<AuthPage />}/>
              <Route path='*' element={<AuthPage />} />
            </>
          }
          {/* IF USER IS AUTH WITH NO ACTIVATED EMAIL*/}
          {
            auth.isAuth &&
            <>
              <Route path='/' element={<RoomPage />}/>
              <Route path='/chat/' element={<ChatPage />}/>
              <Route path='/chat/:id/' element={<ChatPage />}/>
              <Route path='/chat/:id/:nickname/:room/' element={<ChatPage />}/>
              <Route path='*' element={<RoomPage />} />
            </>
          }
          
        </Routes>
      </div>
    );
  }


export default RouterApp;
