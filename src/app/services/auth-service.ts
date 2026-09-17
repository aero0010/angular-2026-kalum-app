import { Injectable } from '@angular/core';
import { User } from '../features/users/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../auth/model/login.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host = environment.BASE_URL_AUTH;
  port = environment.PORT;
  path = environment.AUTH_PAHT;

  private _token?: string;
  private _user?: User;

  public get token(): any{
    if (this._token != null && this._token !== undefined && this, this._token !== '') {
      return this._token;
    }
    
    if (this._token == null && localStorage.getItem('token') != null) {
      this._token = JSON.stringify(localStorage.getItem('token') as string);
      return this._token;
    }

    return null;
  }

  public get user(): User{
    if(this._user != null){
      return this._user;
    }
    
    if (this._user == null && localStorage.getItem('user') != null) {
      this._user = JSON.parse(localStorage.getItem('user') as string) as User;
      return this._user;
    }

    return new User();
  }

  constructor(private http: HttpClient){

  }

  login (login: Login){
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.host}:${this.port}/${this.path}/login`, login, {headers: httpHeaders});
  }

  saveToken(token: string): void{
    this._token = token;
    localStorage.setItem('token', token);
  }

  getPayload(token: string): any{
    if (token && token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return;
  }

  saveUser(payload: any): void{
    this._user = new User();
    this._user.username = payload.username;
    this._user.email = payload.email;
    this._user.roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('user', JSON.stringify(this._user));
  }

  logout(): void{
    this._token = '';
    this._user == null;
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean{
    if (this._token != null) {
      let payload = this.getPayload(this.token);
      return payload != null && payload.username && payload.username.length > 0
    }
    return false;
  }
}
