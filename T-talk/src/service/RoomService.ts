import { AxiosResponse } from "axios";
import API from "../api/api";
import { API_URL } from "../store/constants";
import { RoomResponse } from "../store/types";

//CREATE NEW ROOM REQ
export const createRoom = async (room: string): Promise<AxiosResponse<RoomResponse>> => {

   return await API.post<RoomResponse>('/create-room', {room})
}
//JOIN TO ROOM
export const joinRoom = async (room: string, nickname: string): Promise<AxiosResponse<RoomResponse>> => {

   return await API.get<RoomResponse>(`${API_URL}/join-room/:${room}/:${nickname}`, {withCredentials: true})
   
}
