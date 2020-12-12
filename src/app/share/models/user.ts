export interface User {
    uid: string;
    email: string;
    displayName: string;
}

export interface UserLogin {
  email: string;
  password: string;
  rememberMe: boolean
}