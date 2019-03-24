import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit, Inject } from '@angular/core';
import { PersonService } from '../person.service';
import { UtilService } from 'src/app/shared/util/util.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getPreviousOrParentTNode } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {

  isLinear = true;
  states = [];
  gender = null;
  person = null;
  personService: PersonService;
  utilService: UtilService;
  profileForm: any;
  profileContactForm: any;
  profileAddressForm: any;
  profilePersonalForm: any;
  constructor(private fb: FormBuilder, 
    private _personService: PersonService, 
    private _utilService: UtilService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<PersonUpdateComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.personService = _personService;
    this.utilService = _utilService;

  }

  ngOnInit() {
    this.states = this.utilService.getStates();
    this.profileForm = this.fb.group({
      personId: [''],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      cpf: ['', [Validators.required, this.utilService.ValidateCpf]],
      rg: [''],
      active: [''],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      cellphone: ['', Validators.required],
      cellphone2: [''],
      address: this.fb.group({
        addressId: [''],
        number: ['', Validators.required],
        street: ['', Validators.required],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
    });
    console.log(this.data);
    this.setForm(this.data.person);
  }

  getUser(id){
    console.log(id)
    this.personService.getUser(id).subscribe(data=> this.person=data);
    console.log(this.person)
  }

  replaceAll(data) {
    return data.replace(".", '').replace("-",'').replace("/", '');
  }

  getZip() {
    this.personService.getCep(this.profileForm.get('address').get('zip').value).subscribe(
      (data) => {
        console.log(data);
        if(!data["erro"]) {
          this.profileForm.get('address').get('zip').setValue(this.replaceAll(data["cep"]));
          this.profileForm.get('address').get('street').setValue(data["logradouro"]);
          this.profileForm.get('address').get('neighborhood').setValue(data["bairro"]);
          this.profileForm.get('address').get('city').setValue(data["localidade"]);
          this.profileForm.get('address').get('state').setValue(data["uf"]);
        }
        console.log(data);
      }, error => {console.log(error.erros)}
    );
  }

  setForm(data) {
    this.profileForm.get('personId').setValue(data.personId);
    this.profileForm.get('name').setValue(data.name);
    this.profileForm.get('dateOfBirth').setValue(data.dateOfBirth);
    this.profileForm.get('cpf').setValue(data.cpf);
    this.profileForm.get('rg').setValue(data.rg);
    this.profileForm.get('email').setValue(data.email);
    this.profileForm.get('gender').setValue(data.gender);
    this.profileForm.get('active').setValue(data.active);
    this.profileForm.get('telephone').setValue(data.telephone);
    this.profileForm.get('cellphone').setValue(data.cellphone);
    this.profileForm.get('cellphone2').setValue(data.cellphone2);
    this.profileForm.get('address').get('addressId').setValue(data.address.addressId);
    this.profileForm.get('address').get('number').setValue(data.address.number);
    this.profileForm.get('address').get('street').setValue(data.address.street);
    this.profileForm.get('address').get('neighborhood').setValue(data.address.neighborhood);
    this.profileForm.get('address').get('city').setValue(data.address.city);
    this.profileForm.get('address').get('state').setValue(data.address.state);
    this.profileForm.get('address').get('zip').setValue(data.address.zip);
  }

  onSubmit() {
    let user = this.profileForm.value;
    console.log(user)
    this.personService.updatePerson(user.personId, user).subscribe(
        (data) => {
          this.utilService.callDialogConfirm(this.dialog, DialogComponent, 'Usuário foi atualizado!', "O usuário foi atualizado com sucesso.", 'Ok',null, '60%');
        }, error => {
          console.log(error.erros)
          this.utilService.callDialogConfirm(this.dialog, DialogComponent, 'Falha ao atualizar usuário!', "O usuário não foi atualizado.", 'Ok',null, '60%');
        });
    }
}
