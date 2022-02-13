import React, { FC } from "react";
//@ts-ignore
import LoginForm from "../../components/LoginForm/loginForm";

import '../AuthPage/auth-styles.scss'

const AuthPage:FC = () => {
   return(
      <div>
        <LoginForm/>
      </div>
   )
}
export default AuthPage;