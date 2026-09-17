import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../features/users/models/user.model';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {

  }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],    
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],
      email: ['',Validators.required,Validators.email],
    });
  }

  onSave() {

  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}