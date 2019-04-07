import { CourseService } from 'src/app/course/course.service';
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormArray, FormControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { PersonService } from '../person.service';
import { UtilService } from './../../shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PaymentPlansService } from 'src/app/payment-plans/payment-plans.service';

export function ValidateCpf(control: AbstractControl) {
    const cpf = control.value;
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
      return null;
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null;
      } else {
        return { cpfNotValid: true };
      }
  }
  return null;
}


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false},
  }]
})

export class PersonFormComponent implements OnInit {
  

  @ViewChild('stepper') stepper;
  isLinear = false;
  states = [];
  gender = null;
  courses = null;
  grades = null;
  items = [];
  paymentPlans:any;
  personService: PersonService;
  utilService: UtilService;

  plansForm: FormGroup;
  plans: FormArray;

  constructor(private fb: FormBuilder, 
    private _personService: PersonService, 
    private _utilService: UtilService,
    private dialog: MatDialog,
    private courseService: CourseService,
    private paymentPlansService: PaymentPlansService) { 
    this.personService = _personService;
    this.utilService = _utilService;
  }

  ngOnInit() {
    this.plansForm = this.fb.group({
      plans: this.fb.array([ this.createItem() ]),
    })

    this.states = [ { name: "Acre", initials: "AC"},
              { name: "Alagoas", initials: "AL"},
              { name: "Amapá", initials: "AP"},
              { name: "Amazonas", initials: "AM"},
              { name: "Bahia", initials: "BA"},
              { name: "Ceará", initials: "CE"},
              { name: "Distrito Federal", initials: "DF"},
              { name: "Espírito Santo", initials: "ES"},
              { name: "Goiás", initials: "GO"},
              { name: "Maranhão", initials: "MA"},
              { name: "Mato Grosso", initials: "MT"},
              { name: "Mato Grosso do Sul", initials: "MS"},
              { name: "Minas Gerais", initials: "MG"},
              { name: "Pará", initials: "PA"},
              { name: "Paraíba", initials: "PB"},
              { name: "Paraná", initials: "PR"},
              { name: "Pernambuco", initials: "PE"},
              { name: "Piauí", initials: "PI"},
              { name: "Rio de Janeiro", initials: "RJ"},
              { name: "Rio Grande do Norte", initials: "RN"},
              { name: "Rio Grande do Sul", initials: "RS"},
              { name: "Rondônia", initials: "RO"},
              { name: "Roraima", initials: "RR"},
              { name: "Santa Catarina", initials: "SC"},
              { name: "São Paulo", initials: "SP"},
              { name: "Sergipe", initials: "SE"},
              { name: "Tocantins", initials: "TO"}];
    this.profileForm.get('gender').setValue('F');
  }

  profileForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    cpf: ['', [Validators.required, ValidateCpf]],
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
    plans: ['', Validators.required]
  });

  profilePersonalForm = this.fb.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    cpf: ['', [Validators.required, ValidateCpf]],
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
    this.profileForm.get('plans').setValue(this.items);
  }
  
  removePlan(index) {
    this.plans = this.plansForm.controls.plans as FormArray;
    if(this.plans.length>0){
      this.plans.removeAt(index);
    }
    if(this.plans.length == 0)
      this.addForm()
  }

  resetPlans() {
    this.grades = null;
    this.plansForm = this.fb.group({
      plans: this.fb.array([ this.createItem() ]),
    })
  }

  addPlan() {
    this.plans = this.plansForm.controls.plans as FormArray;
    this.plans.push( this.createItem() );
  }

  createItem(): FormGroup {
     var plan = this.fb.group({
      planId: [0, Validators.required],
      dueDate: ['', Validators.required],
      courseId: [0, Validators.required],
      gradeId: [0, Validators.required]
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

  getGrade(course) {
    this.grades = course.grades;
  }

  newCourse() {
    this.items.push(1);
  }

  onSubmit() {

    this.profileForm.get('name').setValue(this.profilePersonalForm.get('name').value);
    this.profileForm.get('dateOfBirth').setValue(this.profilePersonalForm.get('dateOfBirth').value);
    this.profileForm.get('cpf').setValue(this.profilePersonalForm.get('cpf').value);
    this.profileForm.get('rg').setValue(this.profilePersonalForm.get('rg').value);
    this.profileForm.get('email').setValue(this.profileContactForm.get('email').value);
    this.profileForm.get('telephone').setValue(this.profileContactForm.get('telephone').value);
    this.profileForm.get('cellphone').setValue(this.profileContactForm.get('cellphone').value);
    this.profileForm.get('cellphone2').setValue(this.profileContactForm.get('cellphone2').value);
    this.profileForm.get('plans').setValue(this.plansForm.get('plans').value);
    this.profileForm.get('address').get('number').setValue(this.profileAddressForm.get('number').value);
    this.profileForm.get('address').get('street').setValue(this.profileAddressForm.get('street').value);
    this.profileForm.get('address').get('neighborhood').setValue(this.profileAddressForm.get('neighborhood').value);
    this.profileForm.get('address').get('city').setValue(this.profileAddressForm.get('city').value);
    this.profileForm.get('address').get('state').setValue(this.profileAddressForm.get('state').value);
    this.profileForm.get('address').get('zip').setValue(this.profileAddressForm.get('zip').value);

    this.personService.postPerson(this.profileForm.value).subscribe(
      (data) => {
        console.log("Criou");
        this.stepper.reset();
        this.callDialog(this.dialog, DialogComponent, 'Usuário inserido com sucesso!', "O usuário foi inserido com sucesso.", 'Ok', null);
      }, error => {
        console.log(error.erros)
        this.callDialog(this.dialog, DialogComponent, 'Falha ao inserir usuário!', "O usuário não foi inserido.", 'Ok', null);
      });
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

  getPlans(index){
    this.plans = this.plansForm.controls.plans as FormArray;
    var plan = this.plans.value[index];
    this.paymentPlansService.getPlansOfCourse(plan.courseId, plan.gradeId).subscribe(response => {
      this.paymentPlans = response;
    });
  }
}