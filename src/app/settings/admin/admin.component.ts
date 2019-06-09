import { SettingsService } from './../settings.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/person/person.service';
import { startWith, map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';

export interface User {
  name: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;
  matcher = new MyErrorStateMatcher();

  constructor(private personService: PersonService,
    private settingsService: SettingsService,
    private fb: FormBuilder) { }

  ngOnInit() {
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
    
  passwordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['']
  }, {validator: this.checkPasswords });

  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    personId: [0, Validators.required],
    role: ['', Validators.required]
  });

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  validateForm(){
    this.userForm.get('password').setValue(this.passwordForm.get('password').value);
    return this.userForm.valid && this.passwordForm.valid;    
  }

  setPersonId(id) {
    this.userForm.get('personId').setValue(id);
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  getPersons() {
    this.personService.getPersons().subscribe(response =>{
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

  onSubmit() {
    var user = this.userForm.value;
    this.settingsService.postUserAdmin(user).subscribe((response:any) =>{
      console.log(response)
    },
    error=> {
      console.log(error.error);      
    });
  }




}
