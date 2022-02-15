import { Button, Card, TextField } from "@mui/material";
import { FC } from "react";
import './roomWindow.scss'
interface Props {
   action: string
}
const RoomWindow:FC<Props> = ({action}) => {
const connectRoom = () => {

}
   return(
      <Card className="box wrap">
         <h3>{action} Room</h3>
         <TextField
            id='standard-basic'
            label= { (action == 'Join') ? 'Room ID' : 'Room name'}
            variant='standard'
            type='text'
            placeholder='Room...'
            className='inputs'
         />
         <TextField
            id='standard-basic'
            label='Your nickname'
            variant='standard'
            type='text'
            placeholder='Nickname...'
            className='inputs'
         />
         <Button 
            variant='contained' 
            onClick={connectRoom}>
            {action}
         </Button>
      </Card>
   )
}
export default RoomWindow;