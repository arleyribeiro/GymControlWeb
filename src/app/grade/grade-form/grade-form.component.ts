import { GradeService } from './../grade.service';
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
              private fb: FormBuilder,
              private gradeService: GradeService) { }
  courses = []
  courseId = null
  course = null
  daysweek = []
  startHour
  endHour
  gradeForm = this.fb.group({
    name: [''],
    courseId: [''],
    startDate: [''],
    endDate: [''],
    vacancy: [''],
    userId: [''],
    daysweek: ['']
  })
  ngOnInit() {
    if(this.data.courses != null) {
      this.courses = this.data.courses;
      this.course = this.data.course;
      console.log("this.data.courses: ",this.data.course);
    }
    console.log(this.data.courses);
  }

  onSubmit(){
    this.gradeForm.get('daysweek').setValue(this.daysweek);
    this.gradeService.postGrade(this.gradeForm.value).subscribe(response => {
      console.log(response)
    });
    console.log(this.gradeForm.value)
  }

  addDay(day) {
    this.daysweek.push({
      startHour: this.startHour,
      endHour: this.endHour,
      day: day,
      gradeId: 0
    })
  }

  test() {
    console.log(this.startHour)
    console.log(this.endHour)
  }
}
