import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, login_action, logout_action, registation_action } from "../../store/actions/auth-actions";
import { CHECK_AUTH, LOGIN_ACTION, LOGOUT_ACTION, REGISTRATION_ACTION } from "../../constants";
import { AUTH_STATE_TYPE } from "../../store/types";

const LoginForm: FC = () => {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const dispatch = useDispatch<any>()
   const state:AUTH_STATE_TYPE | any = useSelector(state => state);
   useEffect( () => {
      if(localStorage.getItem('token')){
         checkAuth().then(data => {
            dispatch({
               type: CHECK_AUTH,
               payload: data?.data.user
            })
            console.log(data?.data.user);
            
         })
         
      }
      
   }, [])
   console.log(state);
   if(state.auth.isAuth){
      return(
         <div>
            USER AUTHORIZED - {state.auth.user.email}
            <button onClick={() => {
            logout_action().then(data => {
               dispatch({type: LOGOUT_ACTION})
               })        
            }}>Logout</button>
         </div>
      )
   }
   return(
      <div>
         <input 
         onChange={e => setEmail(e.target.value)}
         value={email}
         type='text'
         placeholder='Email'
         />
         <input 
         onChange={e => setPassword(e.target.value)}
         value={password}
         type='password'
         placeholder='Password'
         />
         <button onClick={() => {
            login_action(email, password).then(data => {
               dispatch({type: LOGIN_ACTION, payload: data?.data.user})
               })        
            }}>Login</button>
         <button onClick={() => {
            registation_action(email, password).then(data => {
               dispatch({type: REGISTRATION_ACTION, payload: data?.data.user})
            })
         }}>Registration</button>
         
      </div>
   )
}

export default LoginForm;