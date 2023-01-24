import { Injectable } from '@angular/core';
import {IAuthenticationResponseModel} from "../../model/authentication.response.model";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() { }

  token : String = "";

  public isLogged = new BehaviorSubject(false);

  public isLoggedIn() : boolean{
    const token = localStorage.getItem("token")
    return token != undefined && token != "";
  }

  public setSession(authResult: IAuthenticationResponseModel | null) : void {
    if(authResult){
      localStorage.setItem('token', authResult.token);
      this.token = authResult.token ?? "";
      this.isLogged.next(this.token!="");
    }

  }

  public logout() : Observable<void> {
    this.token = "";
    this.isLogged.next(this.token!="");
    return of(localStorage.removeItem("token"));
  }

  public getToken(): string | null {
    return localStorage.getItem("token") ;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
