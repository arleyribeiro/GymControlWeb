import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonService } from './person.service';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonComponent } from './person.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonRoutingModule } from './person-routing.module';


@NgModule({
  declarations: [
    PersonComponent,
    PersonFormComponent, 
    PersonDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersonRoutingModule
  ],
  providers: [ PersonService ],
  exports: [ PersonFormComponent ]
})
export class PersonModule { }
