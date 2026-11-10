import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TechnicalCareer } from '../../auth/model/technical-career.model';
import { TechnicalCareerService } from '../../services/technical-career-service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})



export class Dashboard implements OnInit {
  careers: TechnicalCareer[] = [];

  constructor(
    private technicalCareersService: TechnicalCareerService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.technicalCareersService.getTechnicalCareers().subscribe((response) => {
        this.careers = response.data;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Carreras Técnicas',
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }

  async shareCareer(career: TechnicalCareer): Promise<void>{
    const shareData = {
      title: career.name,
      text: `${career.name} - ${career.subTitle ?? ''}`,
      url: window.location.href
    };

    await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    console.log("Text copied")
  }

  assignCareer(career: TechnicalCareer): void{
    if (!this.authService.isAuthenticated()) {
     Swal.fire({
      icon: 'warning',
      title: 'Asignación del curso',
      text: 'Vemos que no has iniciado sesión',
      footer: '<a href="#">v1.0.0</a>'
     }).then(response => {
      this.router.navigate([`login/guest/${career.careerId}`])
     }); 
    }
    console.log('Carrere seleccionada:', career);
  }
}

