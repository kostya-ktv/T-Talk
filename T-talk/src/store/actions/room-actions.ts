import { Dispatch } from "redux";
import { createRoom, deleteRecentRoom, deleteRoom, fetchRooms, getRecentRoomsByUserId, getRoomByRoomId, joinRoom } from "../../service/RoomService";
import { FETCH_RECENT_ROOMS_ACTION, FETCH_ROOMS_ACTION } from "../constants";

//CREATE ROOM
export const createRoom_action = async(room: string, nickname: string) => {
   try {
      const response = await createRoom(room, nickname);

      return response;
   } catch (error) {
      console.log(error);    
   }
}
//GET ROOM By id
export const getRoomByRoomID_action = async(roomid: string) => {
   try {
      const response = await getRoomByRoomId(roomid);
      return response;
   } catch (error) {
      console.log(error);    
   }
}
//JOIN ROOM
export const joinRoom_action = async(room: string, nickname: string) => {
   try {
      const response = await joinRoom(room, nickname);
      return response;
   } catch (error) {
      console.log(error);    
   }
}

//FETCH ROOMS WHICH WERE CREATED
export const getRooms_action = async(userid: number, dispatch: Dispatch) => {

   try {
      await fetchRooms(userid).then(res => {
//@ts-ignore
         dispatch({type: FETCH_ROOMS_ACTION, payload: res.data.rooms})   
      })
   } catch (error) {
      console.log(error);    
   }
}
//FETCH RECENT ROOMS 
export const getRecentRooms_action = async(userid: number, dispatch: Dispatch) => {

   try {
      await getRecentRoomsByUserId(userid).then(res => {

//@ts-ignore
         dispatch({type: FETCH_RECENT_ROOMS_ACTION, payload: res.data.rooms})   
      })
   } catch (error) {
      console.log(error);    
   }
}

//DELETE ROOM
export const deletRoom_action = async(id: string)  => {

   try {
      return await deleteRoom(id);
   } catch (error) {
      console.log(error);    
   }
}
//DELETE RECENT ROOM
export const deleteRecentRoom_action = async(roomid: string, userid: number)  => {

   try {
      return await deleteRecentRoom(roomid, userid);
   } catch (error) {
      console.log(error);    
   }
}