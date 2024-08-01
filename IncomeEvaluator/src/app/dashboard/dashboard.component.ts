import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatGridTile, MatGridList } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardHeader, MatCardFooter, MatCardImage, MatCardTitle, MatCardActions } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridList,
    MatFormField,
    MatLabel,
    MatCard,
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardContent,
    MatToolbar,
    MatCardHeader,
    MatCardFooter,
    MatCardImage,
    MatCardTitle,
    MatCardActions,
    MatGridTile,
    MatCardImage,
    MatInput,
    MatButton
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = localStorage.getItem('username') || '';
  zipcode: string = '';
  state: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/login';
    }
    this.username = localStorage.getItem('username') || '';
  }

  searchZipCode() {
    if (this.zipcode) {
      this.router.navigate(['/zipcode', this.zipcode]);
    }
  }

}
