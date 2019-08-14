import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { PersonService } from './../../person/person.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { GradeService } from '../grade.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/shared/util/util.service';
import { startWith, map } from 'rxjs/operators';
import { CourseService } from 'src/app/course/course.service';
import { PaymentPlansService } from 'src/app/payment-plans/payment-plans.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-grade-new-person',
  templateUrl: './grade-new-person.component.html',
  styleUrls: ['./grade-new-person.component.css']
})

export class GradeNewPersonComponent implements OnInit {
  users = null
  person:any
  selectGalery = 'TABLE';
  filterargs = {nome: 'a'};
  grades = []
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

  courses = null;
  items = [];
  paymentPlans:any = [];
  prices:any = []

  plansForm: FormGroup;
  payment: FormArray;

  constructor(private fb: FormBuilder,  
              private utilService: UtilService,
              private personService: PersonService,
              private gradeService: GradeService,
              private courseService: CourseService,
              private paymentPlansService: PaymentPlansService,
              private dialog: MatDialog) { }


  ngOnInit() {
    this.getPersons();
    this.getCourseWithGrades();
    this.plansForm = this.fb.group({
      payment: this.fb.array([ this.createItem() ]),
    })

    this.payment = this.plansForm.controls.payment as FormArray;
    this.payments = this.payment.value;
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

  selectedPerson(id){
    var personId = 0;
    personId = id ? id : this.myControl.value.personId;
    this.person = this.myControl.value;
    this.profileForm.get('personId').setValue(personId);
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

  profileForm = this.fb.group({
    personId: ['', Validators.required],
    payment: ['', Validators.required]
  });


  addForm() {
    this.profileForm.get('payment').setValue(this.items);
  }
  
  removePlan(index) {
    this.payment = this.plansForm.controls.payment as FormArray;
    if(this.payment.length>0){
      this.payment.removeAt(index);
    }
    if(this.grades.length>0){
      this.grades.splice(index,1);
    }
    if(this.paymentPlans.length>0){
      this.paymentPlans.splice(index,1)
    }
    if(this.prices.length>0){
      this.prices.splice(index, 1)
    }
    if(this.payment.length == 0)
      this.addForm()

    this.payments = this.payment.value;
  }

  resetPlans() {
    this.prices = []
    this.grades = []
    this.paymentPlans = []
    this.payments = []
    this.plansForm.reset()
    this.profileForm.reset()

    this.payment = this.plansForm.controls.payment as FormArray;
    for(var i=0; i<this.payment.length;i++){
      this.removePlan(i)
    }
    this.plansForm = this.fb.group({
      payment: this.fb.array([ this.createItem() ]),
    })
  }

  addPlan() {
    this.payment = this.plansForm.controls.payment as FormArray;
    this.payment.push( this.createItem() );
    this.payments = this.payment.value;
  }

  createItem(): FormGroup {
     var plan = this.fb.group({
      planId: [0, Validators.required],
      personId: 0,
      amountToBePaid: 0,
      userId: 0,
      numberOfMonths: 0,
      dueDay: 5,
      courseId: [0, Validators.required],
      gradeId: [0, Validators.required],
      price: 0
    });
    return plan
  }

  replaceAll(data) {
    return data.replace(".", '').replace("-",'').replace("/", '');
  }

  getCourseWithGrades() {
    this.courseService.getCourseWithGrades().subscribe(response => {
      this.courses = response;
    });
  }

  setGrade(course, index) {
    this.grades[index] = course.grades;
  }

  showGrade(grade) {
  }

  setPrice(plan, index, form) {
    this.prices[index] = plan;
    var payments = this.plansForm.controls.payment as FormArray;
    payments.get(""+index+"").get('numberOfMonths').setValue(plan.numberOfMonths)
    payments.get(""+index+"").get('amountToBePaid').setValue(plan.price)
    payments.get(""+index+"").get('price').setValue(plan.price)
    /*this.payment.get(""+index+"").get('numberOfMonths').setValue(plan.numberOfMonths);
    this.payment.get(""+index+"").get('amountToBePaid').setValue(plan.price)*/
  }

  getPrice(index){
    return (this.prices!=null && this.prices.length>0) ? this.prices[index].price : null;
  }

  setPlans(index){
    this.payment = this.plansForm.controls.payment as FormArray;
    var plan = this.payment.value[index];
    this.paymentPlansService.getPlansOfCourse(plan.courseId, plan.gradeId).subscribe(response => {
      this.paymentPlans[index] = response;
    });
  }

  newCourse() {
    this.items.push(1);
  }

  createObjectPost() {
    this.profileForm.get('payment').setValue(this.plansForm.get('payment').value);
  }

  onSubmit() {
    this.profileForm.value.payment.forEach(e => {
      e.personId = this.myControl.value.personId;
    });
    
    this.gradeService.addPerson(this.profileForm.value.payment).subscribe((response:any) => {
      if(response){
        this.callDialog(this.dialog, DialogComponent, 'O Aluno foi inserido com sucesso!', "O aluno foi inserido na turma.", 'Ok', null);
      }
    }, error => {
      this.callDialog(this.dialog, DialogComponent, 'Notificação do sistema', "Ocorreu um erro ao tentar inserir o aluno.", 'Ok', null);
    });
    this.resetPlans();
  }

  validateForm() {
    var valid = true;
    this.payment = this.plansForm.controls.payment as FormArray;
    var plan = this.payment.value;

    if(!plan.length)
      return false;

    for(let i = 0; i < plan.length; i++) {
      var p = plan[i];
      if((p.planId == 0 || p.gradeId == 0 || p.courseId == 0 || (p.dueDay == 0 || p.dueDay > 31))){
        valid = false;
        return;
      }
    }

    if(valid)
      this.createObjectPost();

    return valid && this.profileForm.valid;
  }

  callDialog(dialog, component, title, content, buttonConfirm, buttonCancel) {
      dialog.open(component, 
        { panelClass: 'custom-dialog-container', 
          width: '35%', 
          disableClose: true, 
          data: {
            title: title,
            content: content,
            buttonCancel: buttonCancel,
            buttonConfirm: buttonConfirm
          }
      });
  }


}
