import { PaymentRoutingModule } from './payment-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';

@NgModule({
  declarations: [ PaymentComponent, PaymentDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PaymentRoutingModule
  ],
  providers: [ ],
  exports: [ ],
  entryComponents: [ ]
})
export class PaymentModule { }
