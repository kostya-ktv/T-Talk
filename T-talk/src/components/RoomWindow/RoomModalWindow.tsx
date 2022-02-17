import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sendAlert } from "../../store/actions/alerts-actions";
import { createRoom_action, getRoomByRoomID_action, getRooms_action } from "../../store/actions/room-actions";
import { StoreType } from "../../store/types";
import './roomModalWindow.scss'

interface Props {
   action: string
}

const RoomModalWindow:FC<Props> = ({action}) => {
      
   const navigate = useNavigate()   
   const dispatch = useDispatch()
   const myRooms = useSelector((state: StoreType) => state.room)
   const [room, setRoom] = useState('')
   const [nickname, setNickname] = useState('')
//Create room handling
   const handleCreateRoom = async () => {
      await createRoom_action(room, nickname)
         .then(async (res) => {       
            if(res == undefined){
               dispatch(sendAlert({status: 'error', message: 'Room already exists'}))
            } else {
               //@ts-ignore
               const resultRoom = res.data[0]
               dispatch(sendAlert({status: 'success', message: `Room <${resultRoom.name}> is created`}))                 
               //FETCH CREATED ROOMS
               await getRooms_action(resultRoom.iuser_id, dispatch)
               //REDIRECT TO CREATED CHAT
               navigate('/chat')
               }  
            })
         .catch(res => {
            dispatch(sendAlert({status: 'error', message: 'something wrong'}))   
            })   
   }
//Join room handling
   const handleJoinRoom = async() => {
      const roomCheck =  myRooms.find(el => el.room_id == room)
      if(roomCheck){
         dispatch(sendAlert({status: 'error', message: `Its your room <${roomCheck.name}>. You should connect from the list below`}))
      }else {
         await getRoomByRoomID_action(room)
            .then(res => {
               !res?.data.length 
                  ?
                     dispatch(sendAlert({status: 'error', message: `The room does not exist or has been deleted`}))
                  :
                     navigate(`/chat/${room}/${nickname}`)
            })
         }
      }

      
   return(
         <div className="box">
            <h4>{action} Room</h4>
            <TextField
               id='standard-basic'
               label= { (action == 'Join') ? 'Room ID' : 'Room name'}
               variant='outlined'
               type='text'
               placeholder='Room...'
               className='inputs'
               value={room}
               onChange={(e)=> setRoom(e.target.value)}
            />
            <TextField
               id='standard-basic'
               label='Your nickname'
               variant='outlined'
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
                  onClick={handleCreateRoom}
                  >
               💾{action}      
               </Button>)
               :
               (<Button 
                  className="create"
                  variant='contained' 
                  onClick={handleJoinRoom}
                  style={{marginTop: 15}}
                  >
                  🔌{action}
                  
               </Button>)
            }
            
         </div>
      )
   }
export default RoomModalWindow;