import { GradeDashboadComponent } from './grade-dashboad/grade-dashboad.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeComponent } from './grade.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeNewPersonComponent } from './grade-new-person/grade-new-personcomponent';

const routes: Routes = [
  { path: '', component: GradeComponent, children: [
    { path: 'new', component: GradeFormComponent },
    { path: 'dashboard', component: GradeDashboadComponent },
    { path: 'new-person', component: GradeNewPersonComponent}
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
