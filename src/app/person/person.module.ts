import { ReactiveFormsModule } from '@angular/forms';
import { PersonService } from './person.service';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonComponent } from './person.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonUpdateComponent } from './person-update/person-update.component';

@NgModule({
  declarations: [
    PersonComponent,
    PersonFormComponent, 
    PersonDetailsComponent, PersonUpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PersonRoutingModule
  ],
  providers: [ PersonService ],
  exports: [ PersonFormComponent, PersonUpdateComponent],
  entryComponents: [ PersonUpdateComponent]
})
export class PersonModule { }
