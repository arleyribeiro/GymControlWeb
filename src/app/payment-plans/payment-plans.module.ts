import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPlansService } from './payment-plans.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ PaymentPlansService ],
  exports: [ ],
})
export class PaymentPlansModule { }
