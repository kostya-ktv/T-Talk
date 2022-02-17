import { Card } from "@mui/material";
import { FC } from "react";
import './list-rooms.scss'
import { IUser, RoomResponseType } from "../../store/types";
import { deletRoom_action, getRooms_action } from "../../store/actions/room-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { sendAlert } from "../../store/actions/alerts-actions";

type Props = {
   rooms: Array<RoomResponseType>,
   user: IUser
}
const ListRooms:FC<Props> = ({rooms, user}) => {
   const navigate = useNavigate()  
   const dispatch = useDispatch();

   const handleDelete = async (roomid: string) => {  
      await deletRoom_action(roomid).then( async() => {
         dispatch(sendAlert({ status: 'info', message: 'Room successfully deleted' }));
         await getRooms_action(user.id, dispatch)
      })
   }

   return(
      <Card className="list-rooms">
         <h5>🔎YOUR ROOMS: {!rooms.length && <small>no room created yet</small>}</h5>
         {
            rooms.map(el => 
            <div key={el.room_id}>
               <p>
                  <span onClick={() => handleDelete(el.room_id)}>
                  🗑 Delete
                  </span>
                  {el.name}
                  <span onClick={() => navigate(`/chat/${el.room_id}`)}>
                  🔌Join
                  </span>
               </p>
            </div>)
            }
      </Card>
   )
}

export default ListRooms;