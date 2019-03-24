import { CourseFormComponent } from './course-form/course-form.component';
import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CourseComponent, children: [
    { path: 'new', component: CourseFormComponent },
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
