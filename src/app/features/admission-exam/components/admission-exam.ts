import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdmissionExamService } from '../../../services/admission-exam-service';
import { AuthService } from '../../../services/auth-service';
import { MatTooltip } from '@angular/material/tooltip';
import { AssignAdmissionExamDate } from './assign-admission-exam-date';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admission-exam',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltip
  ],
  templateUrl: './admission-exam.html',
  styles: ``,
})
export class AdmissionExam implements OnInit {
  dislplayColumn: string[] = ['Number', 'ExamDate', 'Actions'];
  dataSource = new MatTableDataSource<AdmissionExam>();
  careerId: string;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private activeRoute: ActivatedRoute,
    private admissionExamService: AdmissionExamService,
    private dialogForm: MatDialog,
    public authService: AuthService
  ) {
    this.careerId = this.activeRoute.snapshot.paramMap.get('careerId') ?? "";
  }

  getAdmissionExam() {
    this.admissionExamService.getAdmissionExam().subscribe((admissionExams) => {
      this.extractAdmissionExamData(admissionExams.data);
    });
  }

  extractAdmissionExamData(data: any) {
    const dataAdmissionExam: AdmissionExam[] = [];
    let admissionExamList = data;
    admissionExamList.forEach((element: AdmissionExam) => {
      dataAdmissionExam.push(element);
    });

    this.dataSource = new MatTableDataSource<AdmissionExam>(dataAdmissionExam);
    this.dataSource.paginator = this.paginator;
  }

  openFormCreateAdmissionExam(): void {
    Swal.fire({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000
    });
  }

  openFormEditAdmissionExam(): void {
    Swal.fire({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000
    });
  }

  deleteAdmissionExam(id: string): void {
    Swal.fire({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000
    });
  }

  assignAdmissionExam(id: string): void {
    this.dialogForm.open(
      AssignAdmissionExamDate,
      {
        width:
          '450px',
        data: {
          exmaId: id,
          careerId: this.careerId
        }
      }
    );
  }

  applyFiter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFiter(input: HTMLInputElement): void {
    input.value = '';
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.getAdmissionExam();
  }
}
