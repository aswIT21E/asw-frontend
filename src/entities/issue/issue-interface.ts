import type { IActivity, IUser } from '~/entities';
import { IComment } from '../comment';

export interface IIssue {
  _id?: string;
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
