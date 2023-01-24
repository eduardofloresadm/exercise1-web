import {ITask} from "./task.model";

export interface ICourse{
  id: number;
  name: string;
  tasks: ITask[];
}
