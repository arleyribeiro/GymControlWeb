import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CourseComponent, children: [
    { path: 'dashboard', component: CourseDashboardComponent },
  ]},
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class CourseRoutingModule { }
