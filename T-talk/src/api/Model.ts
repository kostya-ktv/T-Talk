export interface AuthResponse {
   accessToken: string;
   refreshToken: string;
   user: IUser;
}
export interface IUser {
   id: number;
   email: string;  
   password: string;
   isActivated: boolean;
   activationlink: string;
}
