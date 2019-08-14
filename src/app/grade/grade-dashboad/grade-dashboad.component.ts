import { GradeService } from './../grade.service';
import { GradeFormComponent } from './../grade-form/grade-form.component';
import { DialogComponent } from './../../shared/dialog/dialog.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { UtilService } from 'src/app/shared/util/util.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  displayedColumns: string[] = ['select', 'name', 'courseName', 'created', 'userName', 'vacancy', 'status', 'options'];
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
              private gradeService: GradeService) { }
  @ViewChild('stepper') stepper;
  isLinear = false;
  courses = []
  grades: any
  course = []
  gradeForm: FormGroup
  ngOnInit() {
    this.getGrades();

    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      courseId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      vacancy: ['', Validators.required],
      userId: ['', Validators.required],
      daysweek: ['']
    });

    this.filteredOptions = this.gradeForm.valueChanges
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isMultiSelected() {
    return (this.selection.selected.length > 1);
  }

  isOnlyOneSelected(element) {
    return (this.selection.selected.length == 1 && 
            element.gradeId == this.selection.selected[0].gradeId);

    //return (this.selection.selected.length == 1 && element.id == this.selection.selected[0].id && this.selection.selected[0].user == this.userId) ? false : true;
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

  addGradeWithCourse() {
    var dialogRef = this.dialog.open(GradeFormComponent, { panelClass: 'custom-dialog-container', 
      width: "60%",
      disableClose: true, 
      data: {
        grade: null,
        title: "title",
        content: "content",
        buttonCancel: "Cancelar",
        buttonConfirm: "Confirmar"
      }});

      dialogRef.afterClosed().subscribe(result => {
        this.getGrades();
      });
  }

  editGrade () {
    var dialogRef = this.dialog.open(GradeFormComponent, { panelClass: 'custom-dialog-container', 
      width: "60%",
      disableClose: true, 
      data: {
        grade: this.selection.selected[0],
        title: "Editar turma",
        content: "content",
        buttonCancel: "Cancelar",
        buttonConfirm: "Confirmar"
      }});

      dialogRef.afterClosed().subscribe(result => {
        
        this.getGrades();
      });
  }

  deleteGrade () {
    var gradeIds = []
    this.selection.selected.forEach(element => {
      gradeIds.push(element.gradeId)
    });
    var dialogRef = this.utilService.callDialogConfirm(this.dialog, DialogComponent, "Excluir turma", "Após a operação a turma será excluída.", "Confirmar", "Cancelar", "25%");
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.gradeService.delete( gradeIds ).subscribe(response => {
          this.getGrades();
          this.utilService.callDialogConfirm(this.dialog, DialogComponent, "Notificação", "A turma foi excluída com sucesso.", "Ok", "", "25%");
        })
      }
      
    });
    this.selection.clear();
  }

  getGrades() {
    this.selection.clear();
    this.gradeService.getGradesWithDaysWeek().subscribe((data:any) => { 
      
      this.grades = data;    
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  
}
