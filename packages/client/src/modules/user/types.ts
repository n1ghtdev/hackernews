export type User = {
  role: string;
  name: string;
  email: string;
  _id: string;
};

export type State = {
  user: User;
  accessToken: string;
  isAuth?: boolean;
  verified: boolean;
};
