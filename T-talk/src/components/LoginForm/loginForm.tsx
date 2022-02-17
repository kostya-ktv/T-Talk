import { Button, TextField } from '@mui/material';
import React from 'react';
import { FC, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';
import { sendAlert } from '../../store/actions/alerts-actions';
import {login_action,registation_action,} from '../../store/actions/auth-actions';
import { LOGIN_ACTION, REGISTRATION_ACTION } from '../../store/constants';
import '../LoginForm/loginForm.scss';

interface Props {
  action: string;
}
const LoginForm: FC<Props> = ({ action }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<any>();

  //LOGIN
  const loginUser = async () => {
    await login_action(email, password)
      .then((data) => {
        if (data == undefined) throw Error('');
        dispatch({ type: LOGIN_ACTION, payload: data?.data.user });
        dispatch(sendAlert({ status: 'success', message: 'Successful login' }));
        navigate(`/room`);
      })
      .catch(() =>
        dispatch(
          sendAlert({ status: 'error', message: 'Invalid Credetials' })
        )
      );
  };

  //REGISTER
  const registerUser = async () => {
    await registation_action(email, password)
      .then((data) => {
        if (data == undefined) throw Error('');
        dispatch({ type: REGISTRATION_ACTION, payload: data?.data.user });
        dispatch(
          sendAlert({
            status: 'success',
            message: 'Registration successful',
          })
        );
      })
      .catch(() =>
        dispatch(
          sendAlert({ status: 'error', message: 'Email already exists' })
        )
      );
  };

  return (
    <div className='box'>
      <h4>{action}</h4>
      <TextField
        id='standard-basic'
        label='Email'
        variant='outlined'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='text'
        placeholder='Email'
        className='inputs'
      />
      <TextField
        id='standard-basic'
        label='Password'
        variant='outlined'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        placeholder='Password'
        className='inputs'
      />

      {action === 'Login' ? (
        <Button className='login' variant='contained' onClick={loginUser}>
          Login
        </Button>
      ) : (
        <Button variant='contained' onClick={registerUser} className='register'>
          Registration
        </Button>
      )}
    </div>
  );
};

export default React.memo(LoginForm);
