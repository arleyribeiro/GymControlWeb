import { GradeService } from './../grade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  course = 12
  daysweek = []
  selectedsDay = []
  startHour
  endHour
  gradeForm = this.fb.group({
    name: ['', Validators.required],
    courseId: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    vacancy: ['', Validators.required],
    userId: ['', Validators.required],
    daysweek: ['']
  })
  ngOnInit() {
    this.initDays();
    if(this.data.courses != null) {
      this.courses = this.data.courses;
      this.course = this.data.course;

      console.log("this.data.course: ",this.data.course);
    }
    console.log(this.data.courses);
  }

  onSubmit(){
    this.validateDaysWeek();
    this.gradeForm.get('daysweek').setValue(this.selectedsDay);
    this.gradeService.postGrade(this.gradeForm.value).subscribe(response => {
      console.log(response)
    });
    console.log(this.gradeForm.value)
  }

  initDays() {
    let nameDays = ['Domingo','Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    for(let i = 0; i < 7; i++)
      this.daysweek.push({
        startHour: null,
        endHour: null,
        day: i+1,
        gradeId: 0,
        name: nameDays[i]
      })
  }

  validateDaysWeek() {
    console.log("validade day week")
    this.daysweek.forEach(day =>{
      console.log(day)
      if(day.startHour != null && day.endHour != null)
        this.selectedsDay.push(day);
    })
    console.log(this.selectedsDay)
  }
}
