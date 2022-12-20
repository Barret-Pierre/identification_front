export interface IUser {
  id: number;
  email: string;
}

export interface IComment {
  id: number;
  comment: string;
  createdAt: string;
  createdBy: {
    email: string;
  };
}
