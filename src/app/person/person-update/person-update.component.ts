import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { UtilService } from 'src/app/shared/util/util.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  isLinear = true;
  states = [];
  gender = null;
  personService: PersonService;
  utilService: UtilService;
  profileForm: any;
  profileContactForm: any;
  profileAddressForm: any;
  profilePersonalForm: any;
  constructor(private fb: FormBuilder, 
    private _personService: PersonService, 
    private _utilService: UtilService,
    private dialog: MatDialog) { 
    this.personService = _personService;
    this.utilService = _utilService;
  }

  ngOnInit() {
    this.states = this.utilService.getStates();
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      cpf: ['', [Validators.required, this.utilService.ValidateCpf]],
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
    });

    this.profilePersonalForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      cpf: ['', [Validators.required, this.utilService.ValidateCpf]],
      rg: ['']
    });

    this.profileContactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      cellphone: ['', Validators.required],
      cellphone2: ['']
    });

    this.profileAddressForm = this.fb.group({
        number: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
    });
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

  onSubmit() {

    this.profileForm.get('name').setValue(this.profilePersonalForm.get('name').value);
    this.profileForm.get('dateOfBirth').setValue(this.profilePersonalForm.get('dateOfBirth').value);
    this.profileForm.get('cpf').setValue(this.profilePersonalForm.get('cpf').value);
    this.profileForm.get('rg').setValue(this.profilePersonalForm.get('rg').value);
    this.profileForm.get('email').setValue(this.profileContactForm.get('email').value);
    this.profileForm.get('telephone').setValue(this.profileContactForm.get('telephone').value);
    this.profileForm.get('cellphone').setValue(this.profileContactForm.get('cellphone').value);
    this.profileForm.get('cellphone2').setValue(this.profileContactForm.get('cellphone2').value);
    this.profileForm.get('address').get('number').setValue(this.profileAddressForm.get('number').value);
    this.profileForm.get('address').get('street').setValue(this.profileAddressForm.get('street').value);
    this.profileForm.get('address').get('neighborhood').setValue(this.profileAddressForm.get('neighborhood').value);
    this.profileForm.get('address').get('city').setValue(this.profileAddressForm.get('city').value);
    this.profileForm.get('address').get('state').setValue(this.profileAddressForm.get('state').value);
    this.profileForm.get('address').get('zip').setValue(this.profileAddressForm.get('zip').value);

  }


}
