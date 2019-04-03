import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fbind } from 'q';

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
  courseId = null
  course = null
  
  gradeForm = this.fb.group({
    name: [''],
    courseId: [''],
    startDate: [''],
    endDate: [''],
    startHour: [''],
    endHour: [''],
    vacancy: [''],
    userId: [''],
    alldDays: [''],
    monday: [''],
    tuesday: [''],
    wednesday: [''],
    thursday: [''],
    friday: [''],
    saturday: [''],
    sunday: ['']
  })
  ngOnInit() {
    if(this.data.courses != null) {
      this.courses = this.data.courses;
      this.courseId = this.data.course.courseId;
      this.course = this.data.course;
      console.log("this.data.courses: ",this.data.course);
    }
    console.log(this.data.courses);
  }

  onSubmit(){
    console.log(this.gradeForm.value)
  }

}
