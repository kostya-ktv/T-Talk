import { Params } from 'react-router-dom';
import { RoomResponseType } from '../store/types';
import { roomIsInStore } from './RoomService';

export const fetchCredentials = (myRooms: Array<RoomResponseType>, credentialsParam: Params<string>) => {

  const getSuitableCredentials = () => {
    // < myRooms[myRooms.length - 1]> give forward redirect to created chat
    // roomIsInStore(myRooms, params.id) redirect from Join Buttons of List rooms
    const { ...credentialsStore } =
      roomIsInStore(myRooms, credentialsParam.id) ||
      myRooms[myRooms.length - 1];
    
      const { room_id: id, nickname, name: room } = credentialsStore;
    return { id, nickname, room };
  };
  //MERGING
  if (!credentialsParam.nickname)
    credentialsParam = { ...getSuitableCredentials() };

  return credentialsParam;
};

//SET UP REMEMBER ME OPTION FROM LOGIN WINDOW
export let STORAGE: Storage = sessionStorage;
export const setStorage = (remember: boolean) => {
   STORAGE = !remember ? localStorage : sessionStorage;
}

export const showTypingSpan = (setIsTyping: (val: boolean) => void) => {
  setIsTyping(true)
  setTimeout(() => setIsTyping(false), 5000)
}
//EMAIL VALIDATOR
export const emailValidator = (email: string, setEmailValid: (val: boolean) => void) => {
  const pattern = /\S+@\S+\.\S+/;
 const isValid = pattern.test(email);
  !isValid ? setEmailValid(false) : setEmailValid(true) 
}

//PASSWORD VALIDATOR
export const passwordValidator = (password: string, setPasswordValid: (val: boolean) => void) => {
  const pattern = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/
  const isValid = pattern.test(password)
  !isValid ? setPasswordValid(false) : setPasswordValid(true) 
}
