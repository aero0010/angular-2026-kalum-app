import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
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

  constructor(private router: Router, public authService: AuthService){

  }

  userView(){
    console.log(this.authService.isAuthenticated());
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/users']);
    }
  }
}
