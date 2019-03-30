import { CourseFormComponent } from './course/course-form/course-form.component';
import { GradeFormComponent } from 'src/app/grade/grade-form/grade-form.component';
import { PersonService } from './person/person.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UtilService } from './shared/util/util.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { GradeModule } from './grade/grade.module';
import { CourseModule } from './course/course.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,    
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GradeModule,
    CourseModule,
    AppRoutingModule
  ],
  providers: [ PersonService, UtilService ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogComponent, GradeFormComponent, CourseFormComponent ]
})
export class AppModule { }