import { Injectable } from '@angular/core';
import { TechnicalCareer } from '../auth/model/technical-career.model';

@Injectable({
  providedIn: 'root',
})
export class TechnicalCareerService {
  getTechnicalCareers(): Promise<TechnicalCareer[]> {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        //reject('Hubo un error en el sistema al momento de consultar las carreras ténicas');
        resolve([
          {
            careerId: '1',
            name: 'Career 1',
            image: 'images/tics.jpg',
            description: 'Descripción 1',
            subTitle: 'Subtítulo 1'
          },
          {
            careerId: '2',
            name: 'Career 2',
            image: 'images/tics.jpg',
            description: 'Descripción 2',
            subTitle: 'Subtítulo 2'
          }, {
            careerId: '3',
            name: 'Career 3',
            image: 'images/tics.jpg',
            description: 'Descripción 3',
            subTitle: 'Subtítulo 3'
          },
          {
            careerId: '4',
            name: 'Career 4',
            image: 'images/tics.jpg',
            description: 'Descripción 4',
            subTitle: 'Subtítulo 4'
          }
        ]);
      }, 2000);

    });
  }
}
