import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { User } from '../models/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCreateForm } from './user-create-form';
import Swal from 'sweetalert2';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-list',
  standalone: true,
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
    MatTooltipModule
],
  templateUrl: './user-list.html',
  styles: ``,
})
export class UserList implements OnInit{

  displayColums: string[] = ['lastName', 'firstName', 'username', 'email', 'phoneNumber', 'roles', 'actions']
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private userService: UserService, private dialogForm: MatDialog){

  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.getUserData(response.data);
    });
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
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

  ngOnInit(): void {
    this.getUsers();  
  }

  getUserData(data:any){
    const dataUser: User[] = [];
    let userList = data;
    userList.forEach((element: User) => {
      dataUser.push(element);
    });
    this.dataSource = new MatTableDataSource<User>(dataUser);
    this.dataSource.paginator = this.paginator;
  }

  openFormCreateUser(){
    const dialogFormRef = this.dialogForm.open(UserCreateForm, {width: '450px'})
    .afterClosed()
    .subscribe(formResponse => {
      if (formResponse === 0) {
        this.getUsers();
      }
    });
  }

  openFormEditUser(user: User){
    this.dialogForm.open(UserCreateForm, {width: '450px', data: user})
    .afterClosed()
    .subscribe(formResponse => {
      if(formResponse === 0){
        this.getUsers();
      }
    });
  }

  deleteUser(id: string){
    Swal.fire({
      title: "Esta seguro de eliminar el registro?",
      text: "Estos cambios no pueden revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.isConfirmed)
        this.userService.deleteUser(id).subscribe((response: any) => {
          Swal.fire({
            title: "Eliminado!",
            text: "El registro fue eliminado",
            icon: "success"
          }).then(result => {
            if(result.isConfirmed) {
              this.getUsers();
            }
          });
        });
      }
    });
  }
}
