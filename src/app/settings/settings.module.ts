import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsService } from './settings.service';
import { AdminComponent } from './admin/admin.component';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent, AdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SettingsRoutingModule
  ],
  providers: [ SettingsService ],
  exports: [ AdminComponent ],
  entryComponents: [ ]
})
export class SettingsModule { }
