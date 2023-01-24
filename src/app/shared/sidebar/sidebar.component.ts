import {Component, OnInit} from '@angular/core';
import {LoginService} from "../service/login/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICourse} from "../model/course.model";
import {UserService} from "../service/user/user.service";
import {BehaviorSubject, tap} from "rxjs";
import {IUser} from "../model/user.model";
import {CourseService} from "../service/course/course.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private userService: UserService, private courseService: CourseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  user: IUser | null = null;

  currentUserSubject = new BehaviorSubject<IUser | null>(this.user);

  courses: ICourse[] | null = null;

  ngOnInit(): void {
    this.loginService.isLogged.subscribe(value => {
      this.getUserLoggedIn();
      this.getCoursesByUserLoggedIn();
    })
  }

  private getCoursesByUserLoggedIn() {
    this.currentUserSubject.subscribe(value => {
      if (value?.id)
        this.courseService.getCoursesByUserLoggedIn().subscribe(res => {
          this.courses = res.body ?? null;
        })
    })
  }

  private getUserLoggedIn() {
    this.userService.getUserLogged().subscribe(value => {
      this.user = value.body ?? null
      this.currentUserSubject.next(this.user);
    });
  }

  logout(): void {
    this.loginService.logout().subscribe(value =>
      this.router.navigate(['login'])
    );
  }

}
