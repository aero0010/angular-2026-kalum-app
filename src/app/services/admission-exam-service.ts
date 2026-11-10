import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionExamService {
  host = environment.BASE_URL_KMAN;
  port = environment.PORT_KMAN;
  path: string = environment.KMAN_PATH;

  constructor(private httpClient: HttpClient){}

  getAdmissionExam():Observable<any>{
    return this.httpClient.get<any>(`${this.host}:${this.port}/${this.path}/admision-exam`)
  }
}
