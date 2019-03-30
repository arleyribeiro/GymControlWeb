import { PaymentDashboardComponent } from './payment-dashboard/payment-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent, children: [
    { path: 'dashboard', component: PaymentDashboardComponent },
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
export class PaymentRoutingModule { }
