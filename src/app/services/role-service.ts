import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../features/roles/models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  host: string = environment.BASE_URL_KMAN;
  port: number = environment.PORT;
  path: string = environment.BASE_URL_KMAN;

  constructor(private httpClient: HttpClient){}

  getRoles(): Observable<any>{
    return this.httpClient.get<any>(`${this.host}:${this.port}/${this.path}/role`);
  }
  createRole(role: Role): Observable<any>{
    return this.httpClient.post<any>(`${this.host}:${this.port}/${this.path}/role`,role);
  }

  updateRole(role: Role): Observable<any>{
    return this.httpClient.put<any>(`${this.host}:${this.port}/${this.path}/role/${role.id}`,role);
  }

  deleteRole(id:string): Observable<any>{
    return this.httpClient.delete<any>(`${this.host}:${this.port}/${this.path}/role/${id}`);
  }

}
