import { AxiosResponse } from "axios";
import API from "../api/api";
import { API_URL } from "../store/constants";
import { RoomResponseType } from "../store/types";

//CREATE NEW ROOM REQ
export const createRoom = async (room: string, nickname: string): Promise<AxiosResponse<RoomResponseType>> => {
   return await API.post<RoomResponseType>('/create-room', {room, nickname})
}
//JOIN TO ROOM
export const joinRoom = async (room: string, nickname: string): Promise<AxiosResponse<RoomResponseType>> => {
   return await API.get<RoomResponseType>(`${API_URL}/join-room/:${room}/:${nickname}`, {withCredentials: true})
}

//FETCH ALL USER ROOMS
export const fetchRooms = async(userid: number): Promise<AxiosResponse<Array<RoomResponseType>>> => {
   return await API.get<Array<RoomResponseType>>(`${API_URL}/rooms/${userid}`, {withCredentials: true})
}
//DELETE ROOM
export const deleteRoom = async(id: string) => {
   return await API.get(`${API_URL}/delete-room/${id}`, {withCredentials: true})
}
//DELETE RECENT ROOM
export const deleteRecentRoom = async(roomid: string, userid: number) => {
   return await API.get(`${API_URL}/delete-recent-room/${roomid}/${userid}`, {withCredentials: true})
}
//Find room in store by Params
export const roomIsInStore = (myRooms: Array<RoomResponseType>, id: string | undefined) => {
   //if store iclude room
   return myRooms.length && myRooms.find(el => el.room_id === id)
 }

//GET ROOM BY ROOM ID
export const getRoomByRoomId = async(roomid: string) => {
   return await API.get<Array<RoomResponseType>>(`${API_URL}/get-room/${roomid}`, {withCredentials: true})
}
//GET RECENTROOMS BY USER ID
export const getRecentRoomsByUserId = async(userid: number) => {
   return await API.get<Array<RoomResponseType>>(`${API_URL}/get-recent-rooms/${userid}`, {withCredentials: true})
}

