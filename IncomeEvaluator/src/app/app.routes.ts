import { provideRouter, RouterModule, Routes } from '@angular/router';
import { LoginForm } from './components/login-form/login-form.component';
import { AuthGuard } from './auth/auth.guard';
import { RegistrationForm } from './components/registration-form/registration-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ZipcodeComponent } from './components/zipcode/zipcode.component';
import { StateComponent } from './components/state/state.component';
import { PeopleComponent } from './components/people/people.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginForm, pathMatch: 'full' },
  { path: 'register', component: RegistrationForm, pathMatch: 'full' },
  { path: 'zipcode/:zipcode', component: ZipcodeComponent, canActivate: [AuthGuard] },
  { path: 'state/:state', component: StateComponent, canActivate: [AuthGuard] },
  { path: 'user/:id', component: PeopleComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders = [
  provideRouter(routes)
];
