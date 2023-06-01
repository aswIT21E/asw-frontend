import type { IUser } from '~/entities';
import { IComment } from '../comment';

export interface IIssue {
  _id?: string;
  numberIssue: number;
  subject: string;
  description: string;
  creator: IUser; // FK a IUser
  status: string;
  severity: string;
  type: string;
  date: string;
  priority: string;
  locked?: boolean;
  reasonLock?: string;
  watchers?: IUser[];
  assignedTo?: IUser;
  attachments?: string[];
  deadline?: Date;
  comments?: IComment[];
}
