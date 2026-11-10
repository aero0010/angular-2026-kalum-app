import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidenav',
  //standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatDividerModule
  ],
  templateUrl: './sidenav.html',
  styles: ``,
})
export class Sidenav {

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private router: Router, public authService: AuthService){

  }

  userView(){
    this.closeSidenav.emit();
    
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/users']);
    }
  }

  roleView(){
    this.closeSidenav.emit();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/roles']);
    }
  }

  dashboardView(){
    this.closeSidenav.emit();
    this.router.navigate(['/dashbaord']);
  }

  addmissionExamView(){
    this.closeSidenav.emit();
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/admissionExam']);
    }
  }
}
