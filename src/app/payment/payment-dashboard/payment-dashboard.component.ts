import { PaymentService } from './../payment.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.css']
})
export class PaymentDashboardComponent implements OnInit {

  constructor(private paymentService: PaymentService){}

  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;
  payments:any
  payDay = Date.now
  amountToBePaid:any
  ngOnInit() {

    this.paymentService.getPaymentOfPerson(1).subscribe(response =>{
      this.payments = response;
      this.amountToBePaid = this.payments.reduce((ac, element) => {
        return ac.amountToBePaid + element.amountToBePaid
      });
      console.log(response)
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  submitPayment(){
    this.payments.forEach(element => {
      this.makePayment(element);
    });
  }
  makePayment(payment){
    this.paymentService.updatePayment(payment.paymentId, {
      paymentId: payment.paymentId,
      numberOfMonths: payment.numberOfMonths,
      amountPaid: payment.amountPaid
    }).subscribe(response => {
      console.log("Response: ", response)
    })
  }
}
