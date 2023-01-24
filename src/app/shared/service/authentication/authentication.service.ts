import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser, LoginUser} from "../../model/user.model";
import {IAuthenticationResponseModel} from "../../model/authentication.response.model";


const AUTH_API = 'http://localhost:8080/public/authentication/authenticate/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(param: LoginUser): Observable<HttpResponse<IAuthenticationResponseModel>> {
    const email = param.email;
    const password = param.password;
    return this.http.post<IAuthenticationResponseModel>(AUTH_API , param, {observe: "response"});
  }
}

