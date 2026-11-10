import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  host = environment.BASE_URL_KMAN;
  port = environment.PORT_KMAN;
  path = environment.KMAN_PATH;

  constructor(private httpClient: HttpClient){

  }

  getSchedules(): Observable<any>{
    return this.httpClient.get<any>(`${this.host}:${this.port}/${this.path}/schedule`)
  }

}
