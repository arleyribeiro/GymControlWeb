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
              private paymentPlansService: PaymentPlansService) { }


  ngOnInit() {
    this.getPersons();
    this.getCourseWithGrades();
    this.plansForm = this.fb.group({
      payment: this.fb.array([ this.createItem() ]),
    })
    if(this.options != null){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
        console.log(this.filteredOptions)
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
  }

  getPersons() {
    console.log("Get persons")
    this.personService.getPersons().subscribe(response =>{
      this.persons = response;
      this.options = response;  
      console.log(this.persons)
      if(this.options != null){
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );
          console.log(this.filteredOptions)
      }
    });
  }

  profileForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    cpf: ['', [Validators.required]],
    rg: [''],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    cellphone: ['', Validators.required],
    cellphone2: [''],
    address: this.fb.group({
      number: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    }),
    payment: ['', Validators.required]
  });

  profilePersonalForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    cpf: ['', [Validators.required]],
    rg: ['']
  });

  profileContactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    cellphone: ['', Validators.required],
    cellphone2: ['']
  });

  profileAddressForm = this.fb.group({
      number: ['', Validators.required],
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
  });

  addForm() {
    this.profileForm.get('payment').setValue(this.items);
  }
  
  removePlan(index) {
    console.log(index)
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
  }

  resetPlans() {
    this.prices = []
    this.grades = []
    this.paymentPlans = []
    this.plansForm.reset()
    this.profileAddressForm.reset()
    this.profileContactForm.reset()
    this.profileForm.reset()
    this.profilePersonalForm.reset()
    this.profileForm.get('gender').setValue('F');

    this.payment = this.plansForm.controls.payment as FormArray;
    for(var i=0; i<this.payment.length;i++){
      console.log(i)
      this.removePlan(i)
    }
    this.plansForm = this.fb.group({
      payment: this.fb.array([ this.createItem() ]),
    })
  }

  addPlan() {
    this.payment = this.plansForm.controls.payment as FormArray;
    this.payment.push( this.createItem() );
  }

  createItem(): FormGroup {
     var plan = this.fb.group({
      planId: [1, Validators.required],
      personId: 0,
      amountToBePaid: 0,
      userId: 0,
      numberOfMonths: 0,
      dueDay: 5,
      courseId: [0, Validators.required],
      gradeId: [0, Validators.required],
      price: 0
    });
    plan.get("planId").setValue('1');
    return plan
  }

  replaceAll(data) {
    return data.replace(".", '').replace("-",'').replace("/", '');
  }

  getZip() {
    this.personService.getCep(this.profileAddressForm.get('zip').value).subscribe(
      (data) => {
        console.log(data);
        if(!data["erro"]) {
          this.profileAddressForm.get('zip').setValue(this.replaceAll(data["cep"]));
          this.profileAddressForm.get('street').setValue(data["logradouro"]);
          this.profileAddressForm.get('neighborhood').setValue(data["bairro"]);
          this.profileAddressForm.get('city').setValue(data["localidade"]);
          this.profileAddressForm.get('state').setValue(data["uf"]);
        }
        console.log(data);
      }, error => {console.log(error.erros)}
    );
  }

  getCourseWithGrades() {
    this.courseService.getCourseWithGrades().subscribe(response => {
      this.courses = response;
    });
  }

  setGrade(course, index) {
    console.log("course: ", course)
    this.grades[index] = course.grades;
    console.log("grades: ", this.grades)
  }

  showGrade(grade) {
    console.log("Escolhida: ", grade)
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

  onSubmit() {
    console.log( this.profileForm.value)
    this.profileForm.get('name').setValue(this.profilePersonalForm.get('name').value);
    this.profileForm.get('dateOfBirth').setValue(this.profilePersonalForm.get('dateOfBirth').value);
    this.profileForm.get('cpf').setValue(this.profilePersonalForm.get('cpf').value);
    this.profileForm.get('rg').setValue(this.profilePersonalForm.get('rg').value);
    this.profileForm.get('email').setValue(this.profileContactForm.get('email').value);
    this.profileForm.get('telephone').setValue(this.profileContactForm.get('telephone').value);
    this.profileForm.get('cellphone').setValue(this.profileContactForm.get('cellphone').value);
    this.profileForm.get('cellphone2').setValue(this.profileContactForm.get('cellphone2').value);
    this.profileForm.get('payment').setValue(this.plansForm.get('payment').value);
    this.profileForm.get('address').get('number').setValue(this.profileAddressForm.get('number').value);
    this.profileForm.get('address').get('street').setValue(this.profileAddressForm.get('street').value);
    this.profileForm.get('address').get('neighborhood').setValue(this.profileAddressForm.get('neighborhood').value);
    this.profileForm.get('address').get('city').setValue(this.profileAddressForm.get('city').value);
    this.profileForm.get('address').get('state').setValue(this.profileAddressForm.get('state').value);
    this.profileForm.get('address').get('zip').setValue(this.profileAddressForm.get('zip').value);

    console.log(this.profileForm.value)

    
  }

  callDialog(dialog, component, title, content, buttonConfirm, buttonCancel) {
      dialog.open(component, 
        { panelClass: 'custom-dialog-container', 
          width: '80%', 
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
