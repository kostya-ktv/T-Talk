import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';
import RoomPage from '../pages/RoomPage/RoomPage';
import { checkAuth } from '../store/actions/auth-actions';
import { CHECK_AUTH_ACTION } from '../store/constants';
import { ToastContainer, toast } from 'react-toastify';

import { removeAlert } from '../store/actions/alerts-actions';
import ChatPage from '../pages/ChatPage/ChatPage';
const RouterApp: React.FC = () => {
  const dispatch = useDispatch<any>();

  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const alertMessage = useSelector((state: any) => state.alerts);

  const checkUserAuth = () => {
    checkAuth().then((data) => {
      if (data !== undefined)
        dispatch({
          type: CHECK_AUTH_ACTION,
          payload: data?.data.user,
        });
    });
  };
  //when opening the app, checking the token in storage
  useEffect(() => {
    if (localStorage.getItem('token')) checkUserAuth();
  }, []);

  //show alert message
  if (alertMessage.message.length) {
    toast(alertMessage.message, {
      position: 'top-center',
      type: alertMessage.status,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    //removing alert from store after the showing
    dispatch(removeAlert());
  }

  if (!isAuth) {
    return (
      <div>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Routes>
          <Route path='/' element={<AuthPage />}>
            <Route index element={<AuthPage />} />
            <Route path='*' element={<AuthPage />} />
          </Route>
        </Routes>
      </div>
    );
  }
  return (
    <div>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Routes>
        <Route path='/' element={<RoomPage />} />
        <Route index element={<RoomPage />} />
        <Route path='/chat/:id/:room/:user' element={<ChatPage />} />
        <Route path='*' element={<RoomPage />} />
      </Routes>
    </div>
  );
};

export default RouterApp;
