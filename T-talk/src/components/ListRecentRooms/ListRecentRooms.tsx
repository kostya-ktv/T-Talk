import { Card } from "@mui/material";
import { FC } from "react";
import './listRecentRooms.scss'
import { IUser, RecentRoomType } from "../../store/types";
import { useNavigate } from "react-router";
import { deleteRecentRoom_action, getRecentRooms_action, getRoomByRoomID_action } from "../../store/actions/room-actions";
import { useDispatch } from "react-redux";
import { sendAlert } from "../../store/actions/alerts-actions";

type Props = {
   myRecentRooms: Array<RecentRoomType>,
   user: IUser
}
const ListRecentRooms:FC<Props> = ({myRecentRooms, user}) => {
   const navigate = useNavigate()  
   const dispatch = useDispatch()

   const handleJoinRecentRoom = async ({roomid, nickname, name, userid}:{roomid: string, nickname: string, name: string, userid: number}) => {
      const isExists = await getRoomByRoomID_action(roomid)
      if(isExists?.data.length) {
         navigate(`/chat/${roomid}/${nickname}/${name}`)
      }
      else {
         dispatch(
            sendAlert({
              status: 'info',
              message: 'The room has been removed by admin',
            }))
         await getRecentRooms_action(userid, dispatch)
      }
   }

  const handleDeleteRecentRoom = async ({roomid, userid} : {roomid:string, userid: number}) => {  
      await deleteRecentRoom_action(roomid, userid).then( async() => {
         dispatch(sendAlert({ status: 'info', message: 'Room successfully deleted' }));
         await getRecentRooms_action(userid, dispatch)
      })
   }

   return(
      <Card className="list-recent-rooms">
         <h5>📌RECENT JOINED ROOMS: {!myRecentRooms?.length && <small>no rooms joined yet</small>}</h5>
         {
            myRecentRooms.map(el => 
            <div key={el.id}>
               <p>        
                  <span onClick={() => handleDeleteRecentRoom({roomid: el.roomid, userid: el.userid})}>
                  🗑 Delete
                  </span>
                  {el.name}
                  <span onClick={() => handleJoinRecentRoom({roomid: el.roomid, nickname: el.nickname,name: el.name, userid: el.userid})}>
                  🔌Join
                  </span>
               </p>
            </div>)
            }
      </Card>
   )
}

export default ListRecentRooms;