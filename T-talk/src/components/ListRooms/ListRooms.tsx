import { Card } from "@mui/material";
import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CableIcon from '@mui/icons-material/Cable';
import './list-rooms.scss'

type Props = {
   data: []
}
const ListRooms:FC<Props> = ({data}) => {
   return(
      <Card className="list-rooms">
         <h5>Your created rooms:</h5>
         {
            data.map(el => 
            <>
               <p><DeleteIcon/># {el[1]}<CableIcon/></p>
            </>)
            }
      </Card>
   )
}

export default ListRooms;