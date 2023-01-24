import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TasksComponent} from "./tasks/tasks.component";
import {UserRouteAccessService} from "./configuration/user-route-access.service";
import {LoginComponent} from "./login/login.component";
import {CourseComponent} from "./course/course.component";
import {CourseRoutingResolveService} from "./course/course-routing-resolve.service";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [UserRouteAccessService] },
  { path: 'tasks', component: TasksComponent, canActivate: [UserRouteAccessService]},
  { path: 'login', component: LoginComponent },
  {
    path: 'course/:id',
    component : CourseComponent,
    resolve: {
      tasks : CourseRoutingResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
