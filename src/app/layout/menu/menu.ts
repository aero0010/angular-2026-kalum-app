import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIcon

  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService){

  }

  onToggleSidenav(){
    this.toggleSidenav.emit();
  }

  login(){
    this.router.navigate(['/login']);
  }

  logOut(){
    if(this.authService.isAuthenticated()){
      let username = this.authService.user.username;
      Swal.fire({
        title: "Logout",
        text: "¿Esta seguro de cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed)
          this.authService.logout();
          Swal.fire({
            title: "Logout",
            text: `Hasta luego ${username}!!!`,
            icon: "success"
          }).then(response => {
            if(response.isConfirmed) {
              this.router.navigate(['/dashboard'])
            }
          });
      });
    }
  }
}
