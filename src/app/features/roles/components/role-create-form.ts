import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Role } from '../models/role.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { RoleService } from '../../../services/role-service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-role-create-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,],
  templateUrl: './role-create-form.html',
  styles: ``,
})
export class RoleCreateForm implements OnInit {

  public formRoleGroup: FormGroup;
  role: Role = new Role();
  title: string = 'Agregar';
  isEditMode = false;

  constructor(
    private formDialogRole: MatDialogRef<RoleCreateForm>,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formRoleGroup = this.formBuilder.group({
      name: [data != null ? data.name : '', Validators.required]
    });

    if (data != null) {
      this.title = 'Editar';
      this.isEditMode = true;
      this.role.id = data.id;
    }
  }

  ngOnInit(): void {

  }

  onSave() {
    this.role.name = this.formRoleGroup?.get('name')?.value;
    if (this.title === 'Agregar') {
      this.roleService.createRole(this.role).subscribe((response: any) => {
        console.log(response.success);
        if (response.success) {
          this.formDialogRole.close(0);
          /*Swal.fire({
            icon: 'success',
            title: 'Roles',
            text: response.message,
            footer: 'Kalum App v1.0.0'
          }).then(handlerResult => {
            if (handlerResult.isConfirmed) {
              
            }
          });*/
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Users',
            text: response.message,
            footer: 'Kalum App v1.0.0'
          }).then(handlerResponse => {
            if (handlerResponse.isConfirmed) {
              this.formDialogRole.close(2);
            }
          });
        }
      });
    } else {
      this.roleService.updateRole(this.role).subscribe((response: any) => {
        this.formDialogRole.close(0);
          /*Swal.fire({
            icon: 'success',
            title: 'Roles',
            text: 'Datos actualizados!!!',
            footer: 'Kalum App v1.0.0',
            returnFocus: false
          }).then(handlerResult => {
            if (handlerResult.isConfirmed) {
              
            }
          });*/
      });
    }
  }

  onCancel() {
    this.formDialogRole.close(1);
  }
}
