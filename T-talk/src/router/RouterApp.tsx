import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../pages/AuthPage/AuthPage';
import RoomPage from '../pages/RoomPage/RoomPage';
import { checkAuth } from '../store/actions/auth-actions';
import { CHECK_AUTH_ACTION } from '../store/constants';

const RouterApp: React.FC = () => {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector((state:any) => state.auth.isAuth);

  const checkUserAuth = () => {
    checkAuth().then((data) => {
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

  if(!isAuth){
    return (
      <div>
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
        <Routes>
          <Route path='/' element={<RoomPage />}>
            <Route index element={<RoomPage />} />
            <Route path='*' element={<RoomPage />} />
          </Route>
        </Routes>
  )
  
};

export default RouterApp;
