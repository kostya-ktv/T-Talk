import { createRoom, joinRoom } from "../../service/RoomService";

export const createRoom_action = async(room: string) => {
   try {
      const response = await createRoom(room);
      return response;
   } catch (error) {
      console.log(error);    
   }
}
export const joinRoom_action = async(room: string, nickname: string) => {
   try {
      const response = await joinRoom(room, nickname);
      return response;
   } catch (error) {
      console.log(error);    
   }
}