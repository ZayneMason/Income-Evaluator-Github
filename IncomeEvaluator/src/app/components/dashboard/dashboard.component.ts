import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatGridTile, MatGridList } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardContent, MatCardHeader, MatCardFooter, MatCardImage, MatCardTitle, MatCardActions } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { TaxDataService } from '../../taxdata.service';



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
    MatButton,
    MatProgressBar
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = localStorage.getItem('username') || '';
  zipcode: string = '';
  state: string = '';
  error: string = '';
  errorField: string = '';
  loading: boolean = false;
  userId: string | undefined;
  

  constructor(private router: Router, private taxDataService: TaxDataService) {}

  ngOnInit() {
    if (!localStorage.getItem('jwt')) {
      window.location.href = '/login';
    }
    this.username = localStorage.getItem('username') || '';
    this.userId = localStorage.getItem('userId') || '';
  }

  searchZipCode() {
    if (this.zipcode) {
      this.loading = true
      this.taxDataService.validateZipCode(this.zipcode).subscribe(isValid => {
        if (isValid) {
          this.router.navigate(['/zipcode', this.zipcode]);
          this.loading = false;
        } else {
          this.loading = false;
          this.error = 'Invalid zip code.';
          this.errorField = 'zipcode';
        }
      });
    }
  }

  searchState() {
    if (this.state) {
      this.loading = true;
      this.taxDataService.validateState(this.state).subscribe(isValid => {
        if (isValid) {
          this.router.navigate(['/state', this.state]);
          this.loading = false;
        } else {
          this.error = 'Invalid state abbreviation.'
          this.errorField = 'state';
          this.loading = false;
        }
      });
    }
  }

  navigateToPeople(): void {
    this.router.navigate(['/user', this.userId]);
  }
}
