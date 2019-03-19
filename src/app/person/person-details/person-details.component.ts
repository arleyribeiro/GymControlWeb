import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  users = ["Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro"]
}
