import type { IUser } from '../user';

export interface IActivity {
  id: string;
  actor: IUser;
  message: string;
}
