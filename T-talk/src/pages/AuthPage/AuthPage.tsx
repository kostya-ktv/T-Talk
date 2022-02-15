
import { Card } from "@mui/material";
import { FC } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import Popup from "../../components/PopUp/Popup";

import '../AuthPage/auth.scss'

const AuthPage:FC = () => {
   return(
      <Card className="popup-wrap">  
            <Popup data={<LoginForm action='Login'/>} action='Login' isDisable={false}/>     
            <Popup data={<LoginForm action='Registration'/>} action='Registration' isDisable={false}/>     
      </Card>
   )
}
export default AuthPage;