import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICourse} from "../../model/course.model";
import {ITask} from "../../model/task.model";
import {ITaskDTO} from "../../model/task.dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_KEY = 'http://localhost:8080/api/task/';

  constructor(private http: HttpClient) { }

  public getTasksByCourseAndUserLoggedIn(id: number | string) : Observable<HttpResponse<ITask[]>> {
    return this.http.get<ITask[]>(this.URL_KEY + 'course/' + id,{observe: "response"});
  }

  public setTaskCompleted(task: ITaskDTO) : Observable<HttpResponse<ITaskDTO>>{
    return this.http.post<ITaskDTO>(this.URL_KEY+'complete', task,{observe: "response"})
  }
}
