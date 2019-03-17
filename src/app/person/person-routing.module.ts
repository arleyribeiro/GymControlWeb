import { PersonComponent } from './person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: '', component: PersonComponent, children: [
    { path: 'new', component: PersonFormComponent },
    { path: 'person-details', component: PersonDetailsComponent}
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
export class PersonRoutingModule { }
