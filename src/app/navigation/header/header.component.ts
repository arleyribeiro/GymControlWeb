import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    console.log("teste")
    this.sidenavToggle.emit();
  }
}
