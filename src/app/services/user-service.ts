import { Injectable } from '@angular/core';
import { User } from '../features/users/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host = environment.BASE_URL_AUTH;
  port = environment.PORT;
  path = environment.AUTH_PAHT;

  constructor(private httpClient: HttpClient, private authService: AuthService){

  }

  getUsers(): Observable<any>{
    return this.httpClient.get(<any>(`${this.host}:${this.port}/${this.path}/user`));
  }

  createUser(user: User): Observable<any>{
    return this.httpClient.post<any>(`${this.host}:${this.port}/user`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put<any>(`${this.host}:${this.port}/${this.path}/user/${user.id}`, user)
  }

  deleteUser(id:string): Observable<any>{
    return this.httpClient.delete<any>(`${this.host}:${this.port}/${this.path}/user/${id}`)
  }
}
