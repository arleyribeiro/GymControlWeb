import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course/course.service';
import { PaymentPlansService } from 'src/app/payment-plans/payment-plans.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {

  courses = []
  grades = []
  prices = []
  payments = []
  paymentPlans = []
  constructor(private courseService:CourseService, private paymentPlansService: PaymentPlansService) { }

  ngOnInit() {
    this.getCourseWithGrades();
  }

  getCourseWithGrades() {
    this.courseService.getCourseWithGrades().subscribe((response:any) => {
      this.courses = response;
      console.log(this.courses)
    });
  }

  setGrade(course, index) {
    console.log("setGrade: ",course, index, this.grades)
    this.grades = course.grades;
    console.log("this.grades: ", )
  }

  getPrice(index){
    return (this.prices!=null && this.prices.length>0) ? this.prices[index].price : null;
  }

  setPlans(index){
    var plan = this.payments[index];
    this.paymentPlansService.getPlansOfCourse(plan.courseId, plan.gradeId).subscribe((response:any) => {
      this.paymentPlans = response;
    });
  }

}
