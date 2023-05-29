import { MongoId } from "../../types";

export interface IUser {
    id: MongoId;
    email: string;
    name: string;
    username: string;
    password: string;
    bio: string;
    profilePicture?: string;

  }