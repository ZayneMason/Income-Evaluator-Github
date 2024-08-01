import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
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
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'registration-form',
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
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationForm implements OnInit {
  form!: FormGroup;
  show: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const { firstName, lastName, username, password } = this.form.value;
    this.userService.register({ firstName, lastName, username, password }).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        this.show = true;
        this.errorMessage = '';
        this.loading = false;
        this.userService.authenticate({ username, password }).subscribe(
          (response: any) => {
            console.log('Login successful', response);
            localStorage.setItem('jwt', response.token);
            this.router.navigate(['/']).then(() => { window.location.reload(); });
          },
          (error: any) => {
            console.error('Login failed', error);
            this.errorMessage = 'Login failed. Please check your details and try again.';
            this.loading = false;
          }
        );
      },
      (error: any) => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please check your details and try again.';
        this.loading = false;
      }
    );
  }
}
