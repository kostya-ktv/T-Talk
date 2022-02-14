
import { Card } from "@mui/material";
import { FC } from "react";

import LoginForm from "../../components/LoginForm/LoginForm";
import Popup from "../../components/PopUp/Popup";

import '../AuthPage/auth.scss'

const AuthPage:FC = () => {
   return(
      <Card className="box">      
            <Popup data={<LoginForm action='Login'/>} action='Login'/>     
            <Popup data={<LoginForm action='Registration'/>} action='Registration'/>     
      </Card>
   )
}
export default AuthPage;