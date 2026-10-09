import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.model';
import { UserService } from '../../../services/user-service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './user-create-form.html',
  styles: ``,
})
export class UserCreateForm implements OnInit {

  public formUserGroup: FormGroup;
  user: User = new User();
  title: string = 'Agregar'

  constructor(
    private formDialogUser: MatDialogRef<UserCreateForm>,
    private formBuilder: FormBuilder,
    private userServce: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formUserGroup = formBuilder.group({
      username: [data != null ? data.userName : '', Validators.required],
      fistName: [data != null ? data.firstName : '', Validators.required],
      lastName: [data != null ? data.lastName : '', Validators.required],
      email: [data != null ? data.email : '', Validators.required],
      phoneNumber: [data != null ? data.phoneNumber : '', Validators.required],
      password: [data != null ? data.password : '', Validators.required]
    });

    if (data != null) {
      this.title = 'Edit';
      this.user.id = data.id;
    }
  }

  ngOnInit(): void {

  }

  onSave() {
    this.user.firstname = this.formUserGroup?.get('firstName')?.value;
    this.user.lastname = this.formUserGroup?.get('lastName')?.value;
    this.user.username = this.formUserGroup?.get('username')?.value;
    this.user.email = this.formUserGroup?.get('email')?.value;
    this.user.phoneNumber = this.formUserGroup?.get('phoneNumber')?.value;

    if (this.title === 'Agregar') {
      this.user.password = this.formUserGroup?.get('password')?.value;
      this.userServce.createUser(this.user).subscribe((response: any) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Users',
            text: response.message,
            footer: 'Kalum App v1.0.0'
          }).then(handlerResult => {
            if (handlerResult.isConfirmed) {
              this.formDialogUser.close(0);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Users',
            text: response.message,
            footer: 'Kalum App v1.0.0'
          }).then(handlerResult => {
            if (handlerResult.isConfirmed) {
              this.formDialogUser.close(2);
            }
          });
        }
      });
    } else {
      this.userServce.updateUser(this.user).subscribe((response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Users',
          text: 'Datos actualizados!!!',
          footer: 'Kalum App v1.0.0'
        }).then(handlerResult => {
          if (handlerResult.isConfirmed) {
            this.formDialogUser.close(0);
          }
        });
      });
    }

  }

  onCancel() {
    this.formDialogUser.close(1);
  }
}
