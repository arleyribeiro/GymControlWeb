import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from '@angular/cdk/layout';
import {NgxMaskModule} from 'ngx-mask'
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatRadioModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatDialogModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatRadioModule,
    MatListModule,
    NgxMaskModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatDialogModule
  ]
})
export class MaterialModule {}