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
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.technicalCareersService.getTechnicalCareers();
      this.careers = [...response];
      this.cdr.detectChanges();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Carreras Técnicas',
        text: `${error}`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }
}

