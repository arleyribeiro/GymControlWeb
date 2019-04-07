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

  modalities = [{id: 1, name: "Artes Marciais"},{id: 2, name: "Defesa Pessoal"},{id: 3, name: "Musculação"},{id: 4, name: "Personal Trainner"}]
  courses = []
  teste=null
  editMode=false
  selected = null
  courseForm = this.fb.group({
    courseId: [0],
    name: ['', Validators.required],
    status: ['', Validators.required],
    user: [''],
    modality: ['', Validators.required]
  });
  ngOnInit() {
    this.editMode=false   
    if(this.data.course != null) {
      this.editMode = true
      this.courseForm.get('courseId').setValue(this.data.course.courseId);
      this.courseForm.get('name').setValue(this.data.course.name);
      this.courseForm.get('status').setValue(this.data.course.status);
      this.courseForm.get('modality').setValue(this.data.course.modality);      
      this.selected = this.courseForm.get('modality').value;
    }
  }

  onSubmit(){
    console.log(this.courseForm.value)
    var course = this.courseForm.value
    course.user = 1;//id user loggin
    console.log(course)
    if(this.editMode)
      this.put(course)
    else
      this.post(course)
  }

  post(course){
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

  put(course) {
    console.log("Atula> ", course)
    this.courseService.update(course.courseId, course).subscribe(response=>{
      this.dialog.open(DialogComponent, {panelClass: 'custom-dialog-container', 
        data: {
          
          title: 'Curso Atualizado',
          content: 'O curso foi atualizado com sucesso.',
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

  compState = (val1: string, val2: string) => val1 == val2;
}
