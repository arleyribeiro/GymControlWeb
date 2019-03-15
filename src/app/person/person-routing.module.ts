import { PersonComponent } from './person.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'person', component: PersonComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
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
