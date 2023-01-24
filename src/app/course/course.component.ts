import { Component, OnInit } from '@angular/core';
import {ICourse} from "../shared/model/course.model";
import {ITask} from "../shared/model/task.model";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../shared/service/task/task.service";
import {ITaskDTO} from "../shared/model/task.dto";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tasks }) => {
      this.tasks = tasks;
    });
  }

  tasks?: ITask[];


  public setTaskCompleted(task: ITask): void{
     const taskDTO : ITaskDTO = {
       id: task.id,
       name: task.name
     }
     this.taskService.setTaskCompleted(taskDTO).subscribe(response => {
       if(response){
         const body = response.body ?? null;
         if(body && this.tasks)
           this.tasks = this.tasks.map(task => {
             if(task.id === body.id)
               task.completed = true;
             return task;
           });
       }
     })
  }

}
