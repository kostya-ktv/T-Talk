import { Button, TextField } from '@mui/material';
import React from 'react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  login_action,
  registation_action,
} from '../../store/actions/auth-actions';
import {
  LOGIN_ACTION,
  REGISTRATION_ACTION,
} from '../../store/constants';
import { AuthStateType } from '../../store/types';
import '../LoginForm/loginForm.scss';

interface Props {
  action: string;
}
const LoginForm: FC<Props> = ({ action }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<any>();
  const loginUser = () => {
    login_action(email, password)
      .then((data) => {
         dispatch({ type: LOGIN_ACTION, payload: data?.data.user });
       })
   
  }
  const registerUser = () => {
   registation_action(email, password).then((data) => {
     dispatch({ type: REGISTRATION_ACTION, payload: data?.data.user });
   });
 }

  return (
    <div className='box'>

      <TextField
        id='standard-basic'
        label='Email'
        variant='standard'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='text'
        placeholder='Email'
      />
      <TextField
        id='standard-basic'
        label='Password'
        variant='standard'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Password'
      />

      {
         action === 'Login' ? (
         <Button 
            className='login' 
            variant='contained' 
            onClick={loginUser}>
            Login
         </Button>
         ) : (
         <Button
            variant='contained'
            onClick={registerUser}
            className='register'
         >
            Registration
         </Button>
         )
      }
    </div>
  );
};

export default React.memo(LoginForm);
