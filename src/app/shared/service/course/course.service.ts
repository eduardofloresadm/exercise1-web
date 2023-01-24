import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICourse} from "../../model/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private URL_KEY = 'http://localhost:8080/api/course/';

  constructor(private http: HttpClient) { }

  public getCoursesByUserLoggedIn() : Observable<HttpResponse<ICourse[]>> {
      return this.http.get<ICourse[]>(this.URL_KEY + 'user/logged',{observe: "response"});
  }
}
