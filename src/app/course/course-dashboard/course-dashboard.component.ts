import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'name', 'created', 'user', 'status', 'options'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private utilService: UtilService) { }
  @ViewChild('stepper') stepper;
  isLinear = false;
  courseForm: FormGroup;
  ngOnInit() {
    this.getCourses();
    this.courseForm = this.fb.group({
      Name: [''],
      startDate: ['']
    });
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
    this.dialog.open(DialogComponent, { panelClass: 'custom-dialog-container', 
      width: "30%",
      disableClose: true, 
      data: {
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
    this.selection.clear();
    var data = []
    data.push({name: "teste1", created: "12", status: "ativo", user: "a"})
    data.push({name: "teste2", created: "12", status: "desativado", user: "a"})
    data.push({name: "teste3", created: "12", status: "ativo", user: "a"})
    data.push({name: "teste4", created: "12", status: "ativo", user: "a"})
    data.push({name: "teste5", created: "12", status: "desativado", user: "a"})
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    /*this.personService.getPersons().subscribe((data:any)=>{
      this.users = data;
      console.log(data)
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })*/
  }

}
