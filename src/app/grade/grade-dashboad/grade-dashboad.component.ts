import { GradeFormComponent } from './../grade-form/grade-form.component';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilService } from 'src/app/shared/util/util.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { element } from '@angular/core/src/render3';
import { CourseService } from 'src/app/course/course.service';

export interface User {
  name: string;
}

@Component({
  selector: 'app-grade-dashboad',
  templateUrl: './grade-dashboad.component.html',
  styleUrls: ['./grade-dashboad.component.css']
})
export class GradeDashboadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'name', 'created', 'user', 'status', 'options'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  selected = null
  myControl = new FormControl();
  options: User[] = [
    {name: 'musculacao'},
    {name: 'jiujitsu'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private utilService: UtilService,
              private courseService: CourseService) { }
  @ViewChild('stepper') stepper;
  isLinear = false;
  courses = []
  course = []
  courseForm = this.fb.group({
    Name: [''],
    startDate: ['']
  });
  ngOnInit() {
    this.courseForm = this.fb.group({
      Name: [''],
      startDate: ['']
    });

    this.courseForm.get('Name').setValue('Musculacao');
    this.getCourses();

    this.filteredOptions = this.courseForm.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  applyFilter(filterValue: string) {
    console.log(this.dataSource.filteredData)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isMultiSelected() {
    return (this.selection.selected.length > 1);
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && 
            element.personId == this.selection.selected[0].personId);

    //return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id && this.selection.selected[0].user == this.userId) ? false : true;
  }

  selectUser(user){
    console.log(this.selection.selected)
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

  addGrade() {
    console.log("this.selection.selected[0]", this.selection.selected[0])
    this.dialog.open(GradeFormComponent, { panelClass: 'custom-dialog-container', 
      width: "60%",
      disableClose: true, 
      data: {
        courses: this.courses,
        course: this.selection.selected[0],
        title: "title",
        content: "content",
        buttonCancel: "Cancelar",
        buttonConfirm: "Confirmar"
      }});
  }

  editCourse () {
    this.utilService.callDialogConfirm(this.dialog, DialogComponent, "title", "content", "Confirmar", "Cancelar", "40%");
  }

  deleteCourse () {
    this.utilService.callDialogConfirm(this.dialog, DialogComponent, "title", "content", "Confirmar", "Cancelar", "40%");
  }

  getCourses(){
    console.log("courseForm.name: ", this.courseForm.get('Name').value)
    this.selection.clear();
    /*var data = [{course: "musculacao", name: "musc1", created: "12", status: "ativo", user: "a"},
                {course: "musculacao", name: "musc2", created: "12", status: "ativo", user: "a"},
                {course: "jiujitsu", name: "jiu1", created: "12", status: "ativo", user: "a"},
                {course: "jiujitsu", name: "jiu2", created: "12", status: "ativo", user: "a"}];*/
      this.courseService.get().subscribe((data:any) => {
        this.courses = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      })
  }
}
