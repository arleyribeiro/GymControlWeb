import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  @ViewChild('stepper') stepper;
  isLinear = false;
  ngOnInit() {
  }

  courseForm = this.fb.group({
    Name: [''],
    startDate: ['']
  });
}
