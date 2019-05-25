import { AuthGuardService } from './../guards/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private personService: PersonService,
    private authService: AuthGuardService,) { }

  ngOnInit() {
  }

  login() {
    var user = {
      "personId": 0,
      "name": "Admin",
      "dateOfBirth": "2019-05-25T19:33:16.929Z",
      "cpf": "string",
      "rg": "string",
      "gender": "string",
      "telephone": "string",
      "cellphone": "string",
      "cellphone2": "string",
      "email": "string",
      "address": {
        "addressId": 0,
        "number": "string",
        "street": "string",
        "neighborhood": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "personId": 0
      },
      "password": "admin",
      "role": "string",
      "token": "string",
      "active": true
    }
    this.authService.login(user).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      
      console.log("Retorno: ", token)
    }, err => {
      console.log("erro", err);
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
  }

}
