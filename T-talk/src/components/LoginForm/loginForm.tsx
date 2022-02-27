import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React from 'react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Dispatch } from 'redux';
import { emailValidator, passwordValidator, setStorage } from '../../service/Util';
import { sendAlert } from '../../store/actions/alerts-actions';
import {
  login_action,
  registation_action,
} from '../../store/actions/auth-actions';
import { LOGIN_ACTION, REGISTRATION_ACTION } from '../../store/constants';
import '../LoginForm/loginForm.scss';

interface Props {
  action: string;
}
const LoginForm: FC<Props> = ({ action }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();

  //LOGIN
  const loginUser = async () => {
    await login_action(email, password)
      .then((data) => {
        if (data === undefined) throw Error('');
        dispatch({ type: LOGIN_ACTION, payload: data?.data.user });
        dispatch(sendAlert({ status: 'success', message: 'Successful login' }));
        navigate(`/`)
      })
      .catch(() =>
        dispatch(sendAlert({ status: 'error', message: 'Invalid Credetials' }))
      )
  }

  //REGISTER
  const registerUser = async () => {
    passwordValidator(password, setPasswordValid)
    emailValidator(email, setEmailValid)
    if(!isPasswordValid || !isEmailValid) {
      dispatch(
        sendAlert({ status: 'error', message: 'Invalid Credentials' })
      )
      return
    }
    await registation_action(email, password)
      .then((data) => {
        if (data === undefined) throw Error('')
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
          sendAlert({ status: 'error', message: 'Invalid Credentials' })
        )
      )
  }

  return (
    <div className='box'>
      <h4>{action}</h4>
      <TextField
        autoFocus
        id='standard-basic'
        label='Email'
        variant='outlined'
        onChange={(e) => {
          emailValidator(email, setEmailValid)
          setEmail(e.target.value)        
        }}
        value={email}
        type='text'
        placeholder='Email'
        className='inputs'
        autoComplete={'off'}
        
      />
      <TextField
        label='Password'
        variant='outlined'
        onChange={(e) => {
          setPassword(e.target.value)
          passwordValidator(password, setPasswordValid)
        }}
        value={password}
        type='password'
        placeholder='Password'
        className='inputs'
        helperText={action !== 'Login' && "Passwords must be: 8 characters long, at least 1 number and 1 capital letter"}
      />

      {action === 'Login' ? (
        <>
          <Button 
            className='login' 
            variant='contained' 
            onClick={loginUser}>
            Login
          </Button>
          <FormControlLabel
            control={<Checkbox value='remember' color='success' onClick={() => setStorage(false)} />}
            label='Remember me'
          />
        </>
      ) : (
        <Button 
          variant='contained' 
          onClick={registerUser}
          disabled={isEmailValid && isPasswordValid ? false : true}
          className='register'>
            Registration
        </Button>
      )}
    </div>
  );
};

export default React.memo(LoginForm);
