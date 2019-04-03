import { CourseService } from './../course.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private matDialogRef: MatDialogRef<CourseFormComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private courseService: CourseService,
              private dialog: MatDialog) { }
  courses = []
  teste=null
  editMode=false
  courseForm = this.fb.group({
    name: ['', Validators.required],
    active: [''],
    status: [''],
    user: ['']
  });
  ngOnInit() {
    this.editMode=false
    var course = this.data.course
    if(course != null) {
      this.editMode = true
      this.courseForm.get('name').setValue(course.name);
    }
  }

  onSubmit(){
    console.log(this.courseForm.value)
    var course = this.courseForm.value
    course.user = 1;//id user loggin
    course.status = true;
    this.courseService.post(course).subscribe(response=>{
      this.dialog.open(DialogComponent, {panelClass: 'custom-dialog-container', 
        data: {
          
          title: 'Novo curso adicionado',
          content: 'O curso foi adicionado com sucesso.',
          buttonCancel: '',
          buttonConfirm: 'Ok'
        }});
      this.teste = true;
      console.log(response)
      this.closeModal();
    },
    error=>{console.log(error.error)});
  }

  public closeModal() {
    this.matDialogRef.close();
  }

}
