import { Injectable } from '@angular/core';
import {User} from "../model/user.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"kevin","password":"123","roles":['USER']} ];*/

  public loggedUser!:string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  token!:string;
  private helper = new JwtHelperService();
  public regitredUser : User = new User();

  constructor(private router: Router,
              private http : HttpClient) { }

  login(user : User)
  {
    return this.http.post<User>(environment.apiURLUser+'/login', user , {observe:'response'});
  }

  registerUser(user :User){
    return this.http.post<User>(environment.apiURLUser+'/register', user, {observe:'response'});
  }

  validateEmail(code : string){
    return this.http.get<User>(environment.apiURLUser+'/verifyEmail/'+code);
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT()
  { if (this.token == undefined)
    return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
  }
  getToken():string {
    return this.token;
  }




  /*SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if(user.username== curUser.username && user.password==curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
    });
    return validUser;
  }*/

  logout() {
    this.isloggedIn= false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    localStorage.removeItem('jwt')
    this.router.navigate(['/login']);
  }

  isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
      return false;
    return (this.roles.indexOf('ADMIN') >=0);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
  }
  isTokenExpired(): Boolean
  {
    return this.helper.isTokenExpired(this.token); }

  /*private getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if( curUser.username == username ) {
        this.roles = curUser.roles;
      }
    });
  }*/


  setRegistredUser(user : User){
    this.regitredUser=user;
  }
  getRegistredUser(){
    return this.regitredUser;
  }


}


