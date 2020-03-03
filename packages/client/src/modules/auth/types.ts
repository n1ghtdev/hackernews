export type AuthUser = {
  role: string;
  name: string;
  email: string;
  _id: string;
  password?: string;
};

export type State = {
  user: AuthUser;
  accessToken: string;
  isAuth?: boolean;
  verified: boolean;
};
