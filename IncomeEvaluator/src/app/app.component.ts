import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatListModule,
    MatMenuModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'IncomeEvaluator';
  localStorage: Storage = window.localStorage;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  signOut(): void {
    localStorage.removeItem('jwt');
    this.localStorage.removeItem('username')
    this.router.navigate(['/login']).then(() => { window.location.reload(); });
  }
}
