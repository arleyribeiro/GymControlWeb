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
  displayedColumns: string[] = ['select', 'name', 'telephone', 'email', 'dateOfBirth', 'options'];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  users = null
  selectGalery = false;

  constructor(private dialog: MatDialog, 
              private utilService: UtilService,
              private personService: PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe((data:any)=>{
      this.users = data;
      console.log(data)
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    })
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
    var dialogRef = this.utilService.callDialog(this.dialog, 
      PersonUpdateComponent, 
      "Remover um usuário", "Ao realizar essa operação todas as informações referentes à esse usuário serão bloqueadas.", 
      "Confirmar", 
      "Cancelar", 
      "60%");
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.personService.deactivatePerson(1);

        this.users[1].name = "teste Macarena 7"
        this.personService.updatePerson(1,  this.users[1]).subscribe(data => console.log(data))
      }
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  deleteUser() {
    //callDialog(dialog, component, title, content, buttonConfirm, buttonCancel)
    var dialogRef = this.utilService.callDialog(this.dialog, DialogComponent, "Remover um usuário", "Ao realizar essa operação todas as informações referentes à esse usuário serão bloqueadas.", "Confirmar", "Cancelar", "35%");
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.personService.deactivatePerson(1);
      }
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }

  turnVisualization() {
    this.selectGalery = !this.selectGalery;
  }
}
