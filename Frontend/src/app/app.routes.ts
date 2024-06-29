import { Routes } from '@angular/router';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component:DashboardComponent, canActivate:[AuthGuard]},
    {path: 'account/login', component:LoginComponent}
];
