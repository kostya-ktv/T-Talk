import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { sendSuccessAlert } from "../../store/actions/alerts-actions";
import { createRoom_action } from "../../store/actions/room-actions";
import { CREATE_ROOM } from "../../store/constants";
import './roomWindow.scss'

interface Props {
   action: string
}

const RoomWindow:FC<Props> = ({action}) => {
      
   const navigate = useNavigate()   
   const dispatch = useDispatch();
   const [room, setRoom] = useState('');
   const [nickname, setNickname] = useState('');

   const createRoom = async () => {
      await createRoom_action(room)
         .then(res => {
            if(res == undefined){
               dispatch(sendSuccessAlert({status: 'error', message: 'Room already exists'}))
            } else {
               dispatch(sendSuccessAlert({status: 'success', message: `Room <${res?.data.room}> is created`}))    
               dispatch({type: CREATE_ROOM, payload: [res.data.uuidValue, res.data.room]})
               navigate(`/chat/${res.data.uuidValue}/${res.data.room}/${nickname}`)
            }  
            })
         .catch(res => {
            dispatch(sendSuccessAlert({status: 'error', message: 'something wrong'}))   
            })   
   }
   return(
         <div className="box">
            <h4>{action} Room</h4>
            <TextField
               id='standard-basic'
               label= { (action == 'Join') ? 'Room ID' : 'Room name'}
               variant='standard'
               type='text'
               placeholder='Room...'
               className='inputs'
               value={room}
               onChange={(e)=> setRoom(e.target.value)}
            />
            <TextField
               id='standard-basic'
               label='Your nickname'
               variant='standard'
               type='text'
               placeholder='Nickname...'
               className='inputs'
               value={nickname}
               onChange={(e)=> setNickname(e.target.value)}
            />
            {action === 'Create' ?
               (<Button
               className="join"
                  variant='contained' 
                  style={{marginTop: 15}}
                  onClick={createRoom}
                  >
               💾{action}      
               </Button>)
               :
               (<Button 
                  className="create"
                  variant='contained' 
                  style={{marginTop: 15}}

                  >
                  🔌{action}
               </Button>)
            }
            
         </div>
      )
   }
export default RoomWindow;