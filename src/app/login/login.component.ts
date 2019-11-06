import { DialogComponent } from './../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material';
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
    private router: Router,
    private dialog: MatDialog) { }

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
    this.authService.login( user ).subscribe((response:any) => {
      let token = response.token;
      this.user = response;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigate(['main']);
    }, err => {      
      localStorage.removeItem("jwt");
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      this.erroLogin();
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  erroLogin() {
    var dialogRef = this.dialog.open(DialogComponent,
          { panelClass: 'custom-dialog-container', 
            width: "30%",
            disableClose: true, 
            data: {
              grade: null,
              title: "Erro ao Realizar login",
              content: "Ocorreu um erro ao tentar realizar login, por favor tente novamente!",
              buttonCancel: null,
              buttonConfirm: "Ok"
            }
    });
    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

}
