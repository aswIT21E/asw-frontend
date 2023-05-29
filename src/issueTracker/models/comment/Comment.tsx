import { IUser } from "../user/User";

export interface IComment {
    _id: string;
    author: IUser;
    content: string;
    date: string;
  }