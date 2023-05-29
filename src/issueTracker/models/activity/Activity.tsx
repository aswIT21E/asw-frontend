import { MongoId } from "../../types";
import { IUser } from "../user/User";

export interface IActivity {
    id: MongoId;
    actor: IUser;
    message: string;
  }