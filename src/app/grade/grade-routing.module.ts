import { GradeDashboadComponent } from './grade-dashboad/grade-dashboad.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeComponent } from './grade.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: GradeComponent, children: [
    { path: 'new', component: GradeFormComponent },
    { path: 'dashboard', component: GradeDashboadComponent },
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
export class GradeRoutingModule { }
