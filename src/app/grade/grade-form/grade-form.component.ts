import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css']
})
export class GradeFormComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<GradeFormComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) { }
  courses = []

  ngOnInit() {
    if(this.data.courses != null)
      this.courses = this.data.courses;
    console.log(this.data.courses);
  }

}
