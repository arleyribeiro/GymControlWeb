import { PersonService } from './../../person/person.service';
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

  constructor(private paymentService: PaymentService,
              private personService: PersonService){}

  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any[]>;
  payments:any
  payDay = Date.now
  amountToBePaid:any
  persons:any
  ngOnInit() {
    this.getPersons();
    this.paymentService.getPaymentOfPerson(1).subscribe(response =>{
      this.payments = response;
      console.log("this.payments: ", this.payments)
      if(this.payments.length>0)
        this.amountToBePaid = this.payments.reduce((ac, element) => {
          return ac.amountToBePaid + element.amountToBePaid
        });
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value.name))
    );
  }

  private _filter(value): any{
    const filterValue = value.name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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

  getPersons(){
    this.personService.getPersons().subscribe(response =>{
      this.persons = response;
      this.options = response;
      console.log(this.persons)
    });
  }
}
