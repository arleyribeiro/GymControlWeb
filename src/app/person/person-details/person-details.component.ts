import { GradeService } from './../../grade/grade.service';
import { DialogAddUserComponent } from './../dialog-add-user/dialog-add-user.component';
import { PersonUpdateComponent } from './../person-update/person-update.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { PersonService } from '../person.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})

export class PersonDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'name', 'telephone', 'email', 'dateOfBirth', 'active', 'options'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  users = null
  person = null
  selectGalery = 'TABLE';
  filterargs = {nome: 'a'};
  grades = []
  constructor(private dialog: MatDialog, 
              private utilService: UtilService,
              private personService: PersonService,
              private gradeService: GradeService) { }

  ngOnInit() {
    this.getPersonActive();
  }

  getPersonActive(){
    this.selection.clear();
    this.personService.getPersons().subscribe((data:any)=>{
      this.users = data;
      console.log(data)
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
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

  editUser() {

    var dialogRef = this.utilService.callDialog(this.dialog, DialogComponent, "Atualizar um usuário", "Ao realizar essa operação todas as informações referentes à esse usuário serão bloqueadas.", "Confirmar", "Cancelar", "35%", null);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService
                          .getUser(this.selection.selected[0].personId)
                          .subscribe(data=> {this.person = data
                            var dialogRef = this.utilService.callDialog(this.dialog, 
                              PersonUpdateComponent, 
                              "",
                              "", 
                              "Confirmar", 
                              "Cancelar", 
                              "60%",
                            this.person);
                            dialogRef.afterClosed().subscribe(result => {
                              if (result) {
                                this.getPersonActive();
                                this.selection.clear();
                                console.log(`Dialog result pzza: ${result}`); // Pizza!
                              }
                              console.log(`Dialog result: ${result}`); // Pizza!
                            });                          
                          });
      }
    });  
  }

  disableUsers(active) {
    //callDialog(dialog, component, title, content, buttonConfirm, buttonCancel)

    var dialogRef = this.utilService.callDialog(this.dialog, DialogComponent, "Remover um usuário", "Ao realizar essa operação todas as informações referentes à esse usuário serão bloqueadas.", "Confirmar", "Cancelar", "35%", null);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var listUserId = [];
        this.selection.selected.forEach(element => {
          listUserId.push({active: active, personId: element.personId});
        });
        this.personService.postDisableUser(listUserId).subscribe(data => this.getPersonActive());
        this.selection.clear()
      }
    });
  }

  turnVisualization(type:string) {
    this.selectGalery = type;
  }

  addGrade() {
    console.log("this.selection.selected[0]", this.selection.selected[0])
    this.dialog.open(DialogAddUserComponent, { panelClass: 'custom-dialog-container', 
      width: "60%",
      disableClose: true, 
      data: {
        courses: [],
        course: this.selection.selected[0],
        title: "title",
        content: "content",
        buttonCancel: "Cancelar",
        buttonConfirm: "Confirmar"
      }});
  }

  getGrades() {
    this.gradeService.getGradesWithDaysWeek().subscribe((data:any) => { 
      console.log(data)
      this.grades = data;    
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
