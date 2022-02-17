import { Button, Card } from '@mui/material';
import { FC } from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import Popup from '../../components/PopUp/Popup';
import logo from '../../Assets/T-talk.svg'

const AuthPage: FC = () => {
  return (
     <>
    <Card className='auth-box'>
      <div style={{textAlign: 'center'}}>
      <img src={logo} style={{height: 70, width: 200}}/>
      </div>
      <div className='auth-menu'>
        <Popup
          data={<LoginForm action='Login' />}
          action='🔑 Login'
        />
      </div>
      
      <div className='auth-menu'>
        <Popup
          data={<LoginForm action='Registration' />}
          action='📀 Registration'
        />
      </div>
      
    </Card>
    <Button className='logout'>Copyright © Kostya Kotov 2022.</Button>
    </>
  );
};
export default AuthPage;
