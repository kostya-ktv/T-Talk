import { Button, Card } from '@mui/material';
import { FC, useState } from 'react';
import {Flip} from 'react-awesome-reveal'
import LoginForm from '../../components/LoginForm/LoginForm';
import Popup from '../../components/PopUp/Popup';
import logo from '../../Assets/logo.svg'
import { useNavigate } from 'react-router';
import './auth.scss'
const AuthPage: FC = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
     <>
     <Flip>
    <Card className='auth-box'>
      <div style={{textAlign: 'center'}}>
        <img src={logo} alt="logo" className='img-logo' onClick={ () => {
          navigate('/')
          setShowMenu(!showMenu)
          }}/>

      </div>

      {showMenu === true && 
        <>
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
        </>
      }
    </Card>
    <Button className='logout'>Copyright © Kostya Kotov 2022.</Button>
    </Flip>
    </>
  );
};
export default AuthPage;
