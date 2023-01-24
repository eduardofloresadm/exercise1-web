import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpResponse, HttpClient} from "@angular/common/http";
import {IUser} from "../../model/user.model";
import {IAuthenticationResponseModel} from "../../model/authentication.response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_PATH : string = 'http://localhost:8080/api/user/'

  constructor(private http: HttpClient) { }

  public getUserLogged() : Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(this.API_PATH+'logged', {observe: "response"});
  }
}
