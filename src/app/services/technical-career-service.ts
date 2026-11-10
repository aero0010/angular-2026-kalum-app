import { Injectable } from '@angular/core';
import { TechnicalCareer } from '../auth/model/technical-career.model';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechnicalCareerService {
  host = environment.BASE_URL_KMAN;
  port = environment.PORT_KMAN;
  path: string = environment.KMAN_PATH;


  constructor(private httpClient: HttpClient){}

  getTechnicalCareers():Observable<any>{
    return this.httpClient.get<any>(`${this.host}:${this.port}/${this.path}/technical-career`)
  }
  
}
