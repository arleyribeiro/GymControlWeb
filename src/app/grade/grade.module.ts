import { GradeNewPersonComponent } from './grade-new-person/grade-new-personcomponent';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeComponent } from './grade.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeDashboadComponent } from './grade-dashboad/grade-dashboad.component';
import { GradeService } from './grade.service';

@NgModule({
  declarations: [ GradeComponent, GradeFormComponent, GradeDashboadComponent, GradeNewPersonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    GradeRoutingModule
  ],
  providers: [ GradeService ],
  exports: [ GradeFormComponent ],
  entryComponents: [ GradeFormComponent ]
})
export class GradeModule { }
