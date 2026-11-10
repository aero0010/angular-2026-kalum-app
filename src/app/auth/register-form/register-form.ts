import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../features/users/models/user.model';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-form.html',
  styles: ``,
})

export class RegisterForm implements OnInit {
  registerForm!: FormGroup;
  user: User = new User();
  status: string;
  careerId: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    this.status = 
      this.activateRouter.snapshot.paramMap.get('status')?? '';
      this.careerId = this.activateRouter.snapshot.paramMap.get('careerId') ?? '';
  }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],    
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],
      email: ['',Validators.required,Validators.email],
      phone: ['', Validators.required]
    });
  }

  onSave() {
    this.user.username = this.registerForm?.get('username')?.value;
    this.user.firstName = this.registerForm?.get('firstName')?.value;
    this.user.lastName = this.registerForm?.get('lastName')?.value;
    this.user.email = this.registerForm?.get('email')?.value;
    this.user.phoneNumber = this.registerForm?.get('phone')?.value;
    this.user.password = this.registerForm?.get('password')?.value;

    this.authService.accountCreate(this.user).subscribe((response: any) => {
      console.log(response.success);
      if (response.success) {
        const message = this.status ?
          'Cuenta creada exitosamente, ahora debes elegir una fecha de examen de admisión para iniciar el proceso de estudios':
          response.message;

        this.authService.saveToken(response.data.token);
        const payload = this.authService.getPayload(response.data.token);
        this.authService.saveUser(payload);
        Swal.fire({
          icon: 'success',
          title: 'Crear cuenta',
          text: message,
          footer: 'Kalum App v1.0.0'
        }).then((handlerResult) => {
          console.log(handlerResult.isConfirmed);
          if (handlerResult.isConfirmed) {
            if (this.status) {
              this.router.navigate([`admissionExam/${this.careerId}`]);
            }else{
              this.router.navigate(['/'])
            }
          }
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Users',
          text: response.message,
          footer: 'Kalum App v1.0.0'
        });
      }
    }, e => {
      Swal.fire({
        icon: 'error',
        title: 'Crecion de cuenta',
        text: e.error?.message,
        footer: 'Kalum App v1.0.0'
      });
    });
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}