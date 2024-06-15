import { Routes } from '@angular/router';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { LoginComponent } from './account/login/login.component';

export const routes: Routes = [
    {path: '', component:DashboardComponent},
    {path: 'account/login', component:LoginComponent}
];
