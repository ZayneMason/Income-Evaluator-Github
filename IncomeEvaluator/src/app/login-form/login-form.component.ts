import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatLabel } from '@angular/material/form-field';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatHint } from '@angular/material/form-field';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-demo',
  standalone: true,
  imports: [
  MatCard,
    MatFormField,
    MatInput,
    MatButton,
    MatDivider,
    MatLabel,
    MatSpinner,
    MatHint,
    MatError,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginForm implements OnInit {
  form!: FormGroup;
  show: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
username: any;
password: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const { username, password } = this.form.value;
    this.userService.authenticate({ username, password }).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('username', username);
        this.show = true;
        this.errorMessage = '';
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.loading = false;
      }
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.show = false;
    console.log('Logout successful');
  }
}