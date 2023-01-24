import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/service/authentication/authentication.service";
import {TokenStorageService} from "../shared/service/token-storage/token-storage.service";
import {IUser, LoginUser} from "../shared/model/user.model";
import {IAuthenticationResponseModel} from "../shared/model/authentication.response.model";
import {HttpResponse} from "@angular/common/http";
import {LoginService} from "../shared/service/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form;
    const user: LoginUser = {
      email: email,
      password: password
    }
    this.authService.login(user).subscribe({
      next: (data : HttpResponse<IAuthenticationResponseModel>) => {
        this.loginService.setSession(data?.body);
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
  });
  }
}

