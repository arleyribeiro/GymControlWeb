import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { PersonService } from './../../person/person.service';
import { PaymentService } from './../payment.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

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
              private personService: PersonService,
              private utilService: UtilService,
              private dialog: MatDialog){}

  /*----------------- begin table -------------- */

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'dueDate', 'gradeName', 'planName', 'amountToBePaid', 'status'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isMultiSelected() {
    return (this.selection.selected.length > 1);
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && 
            element.paymentId == this.selection.selected[0].paymentId);

    //return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id && this.selection.selected[0].user == this.userId) ? false : true;
  }

  selectUser(user){
    console.log(this.selection.selected)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource != null) ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /*---------------------------End TABLE------------ */
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
  payments:any
  payDay = Date.now()
  amountToBePaid:any
  persons:any
  paymentMethods = [{id: 1, name:'Dinheiro'}, {id:2, name:'Cartão'}]
  paymentMethod:any 
  panelOpenState = false;
  person:any
  personId:any

  ngOnInit() {
    this.paymentMethod = this.paymentMethods[0];
    this.getPersons();
    if(this.options != null){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  AddPayment() {
    this.payments = this.selection.selected;
    console.log(this.payments)
    this.amountToBePaid = this.payments.reduce((accumulator, element) => {
      return accumulator + element.amountToBePaid
    }, 0);
  }

  submitPayment(){
    var data = []
    this.payments.forEach(element => {
      data.push({
        paymentId: element.paymentId,
        numberOfMonths: element.numberOfMonths,
        amountPaid: element.amountPaid,
        paymentMethodId: this.paymentMethod.id
      })
    });
    this.makePayment(data);
    this.payments = null;
    this.amountToBePaid = null;
    this.selection.clear();
  }

  makePayment(payments){
    this.paymentService.postPayment(payments).subscribe(response => {
        this.getPaymentOfPerson(0);
        if(response)
          this.utilService.callDialog(this.dialog, DialogComponent, "Pagamento realizado com sucesso", "Pagamento realizado com sucesso!", "Ok", null, "35%", null);

    }, error => {
      this.utilService.callDialog(this.dialog, DialogComponent, "Pagamento não realizado!", "Ocorreu um erro ao tentar realizar o pagamento. " + error.error, "Ok", null, "35%", null);
    })
  }

  getPersons() {
    this.personService.getPersons().subscribe(response =>{
      this.persons = response;
      this.options = response;  
      if(this.options != null){
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );
      }
    });
  }

  getPaymentOfPerson(id){
    var personId = 0;
    personId = id ? id : this.myControl.value.personId;
    this.person = this.myControl.value;
    this.paymentService.getPaymentOfPerson(personId).subscribe((response:any) =>{
      if((response == null || !response.length) && id)
        this.utilService.callDialog(this.dialog, DialogComponent, "Notificação do sistema", "Não existe pendência de pagamento para o aluno " + this.person.name, "Ok", null, "35%", null);

        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
    });
  }
}
