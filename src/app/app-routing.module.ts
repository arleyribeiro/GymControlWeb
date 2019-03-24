import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'person'},
  { path: 'person', loadChildren: './person/person.module#PersonModule'},
  { path: 'course', loadChildren: './course/course.module#CourseModule'},
  { path: 'grade', loadChildren: './grade/grade.module#GradeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
