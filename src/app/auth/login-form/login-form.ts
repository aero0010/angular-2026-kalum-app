import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Login } from '../model/login.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login-form.html',
  styles: ``,
})
export class LoginForm implements OnInit {

  loginForm!: FormGroup;
  login: Login = new Login();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }

  onSubmit(){
    if (this.loginForm.valid) {
      this.login.username = this.loginForm.get('username')?.value;
      this.login.password = this.loginForm.get('password')?.value;

      this.authService.login(this.login).subscribe(
        {
          next: (response: any) => {
            if (response.success) {
              this.authService.saveToken(response.data.token);
              const payload = this.authService.getPayload(response.data.token);
              this.authService.saveUser(payload);
              Swal.fire({
                title: 'Login',
                text: `Bienvenido al sistema ¡${this.login.username}!`,
                icon: 'success'
              }).then(result => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              });
            }
          }, error: (response: any) => {
            Swal.fire({
              title: 'Login failed',
              text: response?.error?.message || 'Error de credenciales',
              icon: 'error'
            });
          }
        }
      );
    }
  }

  OnRegister(){
    this.router.navigate(['/register'])
  }
}
