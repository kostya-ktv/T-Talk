import Picker from 'emoji-picker-react';
import { FC } from 'react';
import './emojiPicker.css'

interface Props {
   setCurrentMessage: Function
   currentMessage: string
}
const EmojiPicker:FC<Props> = ({setCurrentMessage, currentMessage}) => {

   const onEmojiClick = (event: any, emojiObject:any) => {
   setCurrentMessage(currentMessage + emojiObject.emoji)
  }
   return(

      <div className='picker-box'>
      <Picker 
        groupVisibility={{
          flags: false,
        }}       
        pickerStyle={{ width: '100%' }}
        onEmojiClick={onEmojiClick}
        disableSearchBar
      />
        </div>

   )
}
export default EmojiPicker



