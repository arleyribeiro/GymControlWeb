import { CourseFormComponent } from './../course-form/course-form.component';
import { CourseService } from './../course.service';
import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { GradeFormComponent } from 'src/app/grade/grade-form/grade-form.component';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'name', 'createdDate', 'username', 'status', 'options'];
  dataSource: any;
  courses: any;
  selection = new SelectionModel<any>(true, []);

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private utilService: UtilService,
              private courseService: CourseService) { }
  @ViewChild('stepper') stepper;
  isLinear = false;
  courseForm: FormGroup;
  ngOnInit() {
    this.getCourses();
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      user: [''],
      status: ['', Validators.required],
      modality: ['', Validators.required]
    });
  }

  applyFilter(filterValue: string) {
    //filterValue = filterValue == 'true' ? 'Ativo' : 'Inativo';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isMultiSelected() {
    return (this.selection.selected.length > 1);
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && 
            element.courseId == this.selection.selected[0].courseId);
  }

  selectUser(user){
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource != null) ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addCourse() {
    var dialogRef = this.dialog.open(CourseFormComponent, 
      { panelClass: 'header', 
      width: "40%",
      disableClose: true,
      data: {
        course: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }

  addGrade() {
    var dialogRef = this.dialog.open(GradeFormComponent, { panelClass: 'custom-dialog-container', 
      width: "60%",
      disableClose: true, 
      data: {
        courses: this.courses,
        course: this.selection.selected[0]
      }});

      dialogRef.afterClosed().subscribe(result => {
        this.getCourses();
      });
  }

  editCourse () {
    var dialogRef = this.dialog.open(CourseFormComponent, { panelClass: 'custom-dialog-container', 
      width: "30%",
      disableClose: true, 
      data: {
        editMode: true,
        course: this.selection.selected[0]
      }});

      dialogRef.afterClosed().subscribe(result => {
        this.getCourses();
      });
  }

  deleteCourse () {
    var courseIds = []
    this.selection.selected.forEach(element => {
      courseIds.push(element.courseId)
    });
    
    var dialogRef = this.utilService.callDialogConfirm(this.dialog, DialogComponent, "Excluir curso", "Após a operação esse curso será excluído.", "Confirmar", "Cancelar", "40%");
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.delete( courseIds ).subscribe(response => {
          this.getCourses();
          this.utilService.callDialogConfirm(this.dialog, DialogComponent, "Notificação", "O curso foi excluído com sucesso.", "Ok", "", "40%");
        })
      }
    });
  }

  getCourses(){
    this.selection.clear();
    this.courseService.get().subscribe((data:any) => { 
      this.courses = data;    
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;});
  }

}
