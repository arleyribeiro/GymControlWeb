import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthGuardService } from './../guards/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private authService: AuthGuardService,
    private router: Router) { }

  formUser = this.fb.group({
    username: '',
    password: '',
    role: 'Admin'
  });

  user = {}
  ngOnInit() {
  }

  login() {
    var user = this.formUser.value;
    user.password = this.authService.encrypt(user.password);
    this.authService.login( this.formUser.value ).subscribe((response:any) => {
      let token = response.token;
      this.user = response;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigate(['person']);
      console.log("Retorno: ", token)
    }, err => {
      console.log("erro", err);
      localStorage.removeItem("jwt");
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
