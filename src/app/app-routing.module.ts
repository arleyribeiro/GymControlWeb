import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'main', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'person', loadChildren: './person/person.module#PersonModule', canActivate: [AuthGuard]},
  { path: 'course', loadChildren: './course/course.module#CourseModule', canActivate: [AuthGuard]},
  { path: 'grade', loadChildren: './grade/grade.module#GradeModule', canActivate: [AuthGuard]},
  { path: 'payment', loadChildren: './payment/payment.module#PaymentModule', canActivate: [AuthGuard]},
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
