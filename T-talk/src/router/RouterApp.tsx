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
import { StoreType } from '../store/types';

const RouterApp: React.FC = () => {

  const dispatch = useDispatch<any>();
  const auth = useSelector((state: StoreType) => state.auth);
  const alertMessage = useSelector((state: any) => state.alerts);

  const checkUserAuth = async() => {
    await checkAuth_action().then(async (data) => {
      if (data !== undefined)
      //@ts-ignore
      await getRooms_action(data.data.user.id,dispatch)
        dispatch({
          type: CHECK_AUTH_ACTION,
          payload: data?.data.user,
        });
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
console.log(auth);

  if (!auth.isAuth) {
    return (
      <div>
        <Toast/>
        <Routes>
          <Route path='/' element={<AuthPage />}>
            <Route index element={<AuthPage />} />
            
            <Route path='/chat/:room/:id' element={<ChatPage />} />
            <Route path='*' element={<AuthPage />} />
          </Route>
        </Routes>
      </div>
    );
  }
  return (
    <div>
      <Toast/>
      <Routes>
        <Route path='/' element={<RoomPage />} />
        <Route index element={<RoomPage />} />
        <Route path='/chat/' element={<ChatPage />} />
        <Route path='/chat/:id' element={<ChatPage />} />
        <Route path='*' element={<RoomPage />} />
      </Routes>
    </div>
  );
};

export default RouterApp;
