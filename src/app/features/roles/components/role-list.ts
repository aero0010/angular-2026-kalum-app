import { CdkVirtualScrollableElement } from '@angular/cdk/scrolling';
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
import { Role } from '../models/role.model';
import { RoleService } from '../../../services/role-service';
import { RoleCreateForm } from './role-create-form';
import Swal from 'sweetalert2';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-role-list',
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
  templateUrl: './role-list.html',
  styles: ``,
})
export class RoleList implements OnInit{
  displayColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Role>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  constructor(private roleService: RoleService, private dialogForm: MatDialog){}

  ngOnInit(): void {
    this.getRoles();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(input: HTMLInputElement): void{
    input.value = '';
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRoles(){
    this.roleService.getRoles().subscribe(roles => {
      this.getRoleData(roles.data);
    });
  }

  getRoleData(data: any){
    const dataRoles: Role[] = [];
    let roleList = data;
    roleList.forEach((element: Role) => {
      dataRoles.push(element);
    });
    this.dataSource = new MatTableDataSource<Role>(dataRoles);
    this.dataSource.paginator = this.paginator;
  }

  openFormCreateRole(){
    this.dialogForm.open(RoleCreateForm, {width: '450px'})
    .afterClosed()
    .subscribe(formResponse => {
      if (formResponse === 0) {
        this.getRoles();
      }
    });
  }

  openFormEditRole(role: Role){
    this.dialogForm.open(RoleCreateForm, { width: '450px', data: role})
    .afterClosed().subscribe(formResponse => {
      if (formResponse === 0) {
        this.getRoles();
      }
    });
  }

  deleteRole(id: string){
    Swal.fire({
      title: "Esta seguro de eliminar el registro?",
      text: "Estos cambios no pueden revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then(result => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(id).subscribe((response: any) => {
          Swal.fire({
            title: "Eliminado!",
            text: "El registro fue eliminado",
            icon: "success"
          }).then(confirmation => {
            if (confirmation.isConfirmed) {
              this.getRoles();
            }
          });
        });
      }
    });
  }
}
