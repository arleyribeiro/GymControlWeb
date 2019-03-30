import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeComponent } from './grade.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeDashboadComponent } from './grade-dashboad/grade-dashboad.component';

@NgModule({
  declarations: [ GradeComponent, GradeFormComponent, GradeDashboadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    GradeRoutingModule
  ],
  providers: [ ],
  exports: [ GradeFormComponent ],
  entryComponents: [ GradeFormComponent ]
})
export class GradeModule { }
