import AuthPage from "../pages/AuthPage/AuthPage"
import ChatPage from "../pages/ChatPage/ChatPage"
import RoomPage from "../pages/RoomPage/RoomPage"

// PUBLIC ROUTES
export const LOGIN_ROUTE = { path: '/', Component: AuthPage}


//PRIVATE ROUTES
export const CHAT_ROUTE = { path: '/chat', Component: ChatPage}
export const ROOM_ROUTE = { path: '/room', Component: RoomPage}

