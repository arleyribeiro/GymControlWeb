import { AuthGuardService } from './guards/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GymControlWeb';

  constructor(private authGuardService: AuthGuardService){ }

  user = null
  isLogged = false;
  ngOnInit(): void {
    this.user = this.authGuardService.getUser();  
    this.isLogged = this.authGuardService.isLoggedIn();
    console.log(this.isLogged)
  }
}
