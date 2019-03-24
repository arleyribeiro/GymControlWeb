import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './course-form/course-form.component';
import { MaterialModule } from '../material.module';
import { CourseUpdateComponent } from './course-update/course-update.component';

@NgModule({
  declarations: [CourseComponent, CourseFormComponent, CourseUpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CourseRoutingModule,
    
  ],
  providers: [ ],
  exports: [ CourseFormComponent ],
  entryComponents: [ ]
})
export class CourseModule { }
