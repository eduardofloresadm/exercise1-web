import {ICourse} from "./course.model";

export interface IUser{
  id?: number;
  name: string;
  email: string;
  password: string;
  courses: ICourse[];
}

export type LoginUser = Omit<IUser, 'id' | 'name' | 'courses'> ;
