import { Component, Inject, OnInit } from '@angular/core';
import { FileRequest } from '../models/file-request.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { TechnicalCareer } from '../../../auth/model/technical-career.model';
import { Schedule } from '../../schedules/models/schedule.model';
import { AdmissionExam } from '../models/admission-exam.model';
import { AdmissionExamService } from '../../../services/admission-exam-service';
import { ScheduleService } from '../../../services/schedule-service';
import { TechnicalCareerService } from '../../../services/technical-career-service';

@Component({
  selector: 'app-assign-admission-exam-date',
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
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './assign-admission-exam-date.html',
  styles: ``,
})
export class AssignAdmissionExamDate implements OnInit {

  fileRequest: FileRequest = new FileRequest();
  public assignAdmissionExamDateForm: FormGroup;
  title: string = 'Solicitud de exámen de admisión';

  careers: TechnicalCareer[] = [];
  schedules: Schedule[] = [];
  admissionEexams: AdmissionExam[] = []

  constructor(
    private admissionExamService: AdmissionExamService,
    private scheduleService: ScheduleService,
    private technicalCareerService: TechnicalCareerService,
    private fromBuilder: FormBuilder,
    private dialogRefAssignAdimissionExamDate: MatDialogRef<AssignAdmissionExamDate>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.assignAdmissionExamDateForm = this.fromBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      examId: [data != null ? data.examId : '', Validators.required],
      careerId: [data != null ? data.careerId : '', Validators.required],
      scheduleId: ['', Validators.required]
    });

  }



  ngOnInit(): void {
    try {
      this.technicalCareerService.getTechnicalCareers().subscribe((response) => {
        console.log(response);
        this.careers = response.data;
      });

      this.admissionExamService.getAdmissionExam().subscribe((response) => {
        console.log(response);
        this.admissionEexams = response.data;
      });

      this.scheduleService.getSchedules().subscribe((response) => {
        console.log(response);
        this.schedules = response.data;
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Solicitud de examen de admisión",
        text: `${error}`,
        footer: "<a href=\"#\">Why do I have this issue?</a>"
      });
    }
  }

  sendOrder(): void {

    this.fileRequest.lastName = this.assignAdmissionExamDateForm.get('lastName')?.value;
    this.fileRequest.firstName = this.assignAdmissionExamDateForm.get('firstName')?.value;
    this.fileRequest.address = this.assignAdmissionExamDateForm.get('address')?.value;
    this.fileRequest.phone = this.assignAdmissionExamDateForm.get('phone')?.value;
    this.fileRequest.email = this.assignAdmissionExamDateForm.get('email')?.value;
    this.fileRequest.status = 'NO_ASSIGNADO';
    this.fileRequest.examId = this.assignAdmissionExamDateForm.get('examId')?.value;
    this.fileRequest.careerId = this.assignAdmissionExamDateForm.get('careerId')?.value;
    this.fileRequest.ScheduleId = this.assignAdmissionExamDateForm.get('ScheduleId')?.value;

    Swal.fire({
      icon: 'success',
      title: 'Solicitud de examen de admisión',
      text: 'La información fue recibida exitosamente, pronto se enviará un correo con más información',
      footer: 'kalum v1.0.0'
    }).then(respose => {
      if (respose.isConfirmed) {
        this.dialogRefAssignAdimissionExamDate.close(0);
      }
    });
  }

  onCancel(): void{
    this.dialogRefAssignAdimissionExamDate.close(0);
  }

}
