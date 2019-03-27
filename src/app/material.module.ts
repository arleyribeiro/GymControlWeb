import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from '@angular/cdk/layout';
import {NgxMaskModule} from 'ngx-mask';
import {
  MatTooltipModule,
  MatTabsModule,
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
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatTooltipModule,
    MatTabsModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    MatTooltipModule,
    MatTabsModule,
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
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule {}