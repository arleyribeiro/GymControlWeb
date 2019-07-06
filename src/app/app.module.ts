import { AuthGuardService, AuthGuard, AuthInterceptor } from './guards/auth-guard.service';
import { PersonModule } from './person/person.module';
import { TableComponent } from './shared/table/table.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UtilService } from './shared/util/util.service';
import { DialogComponent } from './shared/dialog/dialog.component';
import { ChooseGradeAndPaymentComponent } from './shared/choose-grade-and-payment/choose-grade-and-payment.component';
import { GradeModule } from './grade/grade.module';
import { CourseModule } from './course/course.module';
import { PaymentPlansComponent } from './payment-plans/payment-plans.component';
import { PaymentPlansModule } from './payment-plans/payment-plans.module';
import { LoginComponent } from './login/login.component';
import { SettingsModule } from './settings/settings.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    DialogComponent,
    PaymentPlansComponent,
    TableComponent,
    ChooseGradeAndPaymentComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,   
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GradeModule,
    CourseModule,
    PersonModule,
    PaymentPlansModule,
    SettingsModule,
    AppRoutingModule,
  ],
  providers: [ AuthGuardService, AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }, PersonService, UtilService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ TableComponent, DialogComponent, GradeFormComponent, CourseFormComponent]
})
export class AppModule { }