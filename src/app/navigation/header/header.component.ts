import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(private authGuardService: AuthGuardService,
    private router: Router) { }

  user = null;
  isLogged = false;
  ngOnInit() {
   this.getIsLogged();
  }

  getIsLogged(){
    this.getUser();
    return this.authGuardService.isLoggedIn();
  }

  getUser() {
    this.user = this.authGuardService.getUser();
    return this.authGuardService.getUser();
  }

  logout() {
    this.authGuardService.logout();
    this.router.navigate(['login']);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
