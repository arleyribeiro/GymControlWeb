import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CourseService } from './../../course/course.service';
import { GradeService } from './../grade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css']
})
export class GradeFormComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<GradeFormComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private gradeService: GradeService,
              private courseService: CourseService) { }
  courses:any
  courseId = null
  course
  daysweek = []
  selectedsDay = []
  startHour
  endHour
  editMode = false;
  gradeForm = this.fb.group({
    gradeId: [0],
    name: ['', Validators.required],
    courseId: [0, Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    vacancy: ['', Validators.required],
    userId: ['', Validators.required],
    daysweek: ['']
  })

  instructors = [{userId: 1, name: 'Option 1'},{userId: 2, name: 'Option 2'},{userId: 3, name: 'Option 3'}]

  ngOnInit() {
    this.initDays();
    this.getCourses();
    this.editMode = false;
    if(this.data.courses != null) {
      this.courses = this.data.courses;
      this.course = this.data.course;
      this.gradeForm.get('courseId').setValue(this.data.course.courseId)
      console.log("this.data.course: ",this.data.course);
    }

    if(this.data.grade != null) {
      this.editMode = true;
      console.log("this.data.grade: ",this.data.grade);
      this.courseService.get().subscribe(response => {
        this.courses = response;
      });
      this.gradeForm.get('gradeId').setValue(this.data.grade.gradeId)
      this.gradeForm.get('name').setValue(this.data.grade.name)
      this.gradeForm.get('courseId').setValue(this.data.grade.courseId)
      this.gradeForm.get('startDate').setValue(this.data.grade.startDate)
      this.gradeForm.get('endDate').setValue(this.data.grade.endDate)
      this.gradeForm.get('vacancy').setValue(this.data.grade.vacancy)
      this.gradeForm.get('userId').setValue(this.data.grade.userId)

    }
    console.log(this.data.courses);
  }

  onSubmit(){
    this.validateDaysWeek();
    this.gradeForm.get('daysweek').setValue(this.selectedsDay);

    if(this.editMode)
      this.updateGrade(this.gradeForm.value);
    else
      this.postGrade(this.gradeForm.value);
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

  getCourses(){
    this.courseService.get().subscribe(response=>{
      console.log("Courses: ", response)
      this.courses = response;
    })
  }

  postGrade(grade){
    this.gradeService.postGrade(grade).subscribe(response=>{
      this.dialog.open(DialogComponent, {panelClass: 'custom-dialog-container', 
        data: {          
          title: 'Turma Inserida',
          content: 'A turma foi inserida com sucesso.',
          buttonCancel: '',
          buttonConfirm: 'Ok'
        }});
        console.log(response)
        this.closeModal();
      },
      error=>{console.log(error.error)});  }

  updateGrade(grade) {
    this.gradeService.update(grade.gradeId, grade).subscribe(response=>{
      this.dialog.open(DialogComponent, {panelClass: 'custom-dialog-container', 
        data: {          
          title: 'Turma Atualizada',
          content: 'A turma foi atualizada com sucesso.',
          buttonCancel: '',
          buttonConfirm: 'Ok'
        }});
        console.log(response)
        this.closeModal();
      },
      error=>{console.log(error.error)});
  }

  public closeModal() {
    this.matDialogRef.close();
  }
}
