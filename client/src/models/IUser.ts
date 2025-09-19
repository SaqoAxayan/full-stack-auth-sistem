export interface IUser {
  id?: string;
  email: string;
  password: string;
}

export interface IApi {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
}
