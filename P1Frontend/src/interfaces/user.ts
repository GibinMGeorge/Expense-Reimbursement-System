import { UserRole } from './UserRole';


  // Interface for User request object to backend

export interface UserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}


  // interface for login object to backend

  export interface UserLoginRequest {
    username: string;
    password: string;
  };  

  // Interface for User response object from backend

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole;
}