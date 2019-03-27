import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { MaterialModule } from '../material.module';
import { CourseUpdateComponent } from './course-update/course-update.component';

@NgModule({
  declarations: [CourseComponent, CourseDashboardComponent, CourseUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CourseRoutingModule,
    
  ],
  providers: [ ],
  exports: [ CourseDashboardComponent ],
  entryComponents: [ ]
})
export class CourseModule { }
