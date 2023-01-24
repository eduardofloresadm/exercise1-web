import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, mergeMap, Observable, of} from "rxjs";
import {TaskService} from "../shared/service/task/task.service";
import {ITask} from "../shared/model/task.model";

@Injectable({ providedIn: "root" })
export class CourseRoutingResolveService implements Resolve<ITask[] | null>{
  constructor(private taskService : TaskService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITask[] | null> | Promise<ITask[] | null> | ITask[] | null {
    const id : string = route.params['id'];
    if(id) {
      return this.taskService.getTasksByCourseAndUserLoggedIn(id).pipe(
        mergeMap((value, index) => {
          if (value.body) {
            return of(value.body)
          } else
            return EMPTY;
        })
      );
    }
    else {
      return EMPTY;
    }
  }




}
