import { IUser } from '../user/User';
import { IActivity } from '../activity/Activity';
import { IComment } from '../comment/Comment';
import { MongoId } from '../../types';



export interface IIssue {
  id?: MongoId;
  numberIssue: number;
  subject: string;
  description: string;
  activity?: IActivity[];
  creator: IUser; // FK a IUser
  status: string;
  severity: string;
  type: string;
  date: string;
  priority: string;
  comments?: IComment[];
  locked?: boolean;
  reasonLock?: string;
  watchers?: IUser[];
  assignedTo?: IUser;
  attachments?: string[];
  deadline?: Date;

}