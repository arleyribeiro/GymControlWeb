import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { PersonService } from '../person.service';
import { SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  options: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', options: ''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', options: ''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', options: ''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', options: ''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', options: ''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', options: ''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', options: ''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', options: ''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', options: ''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', options: ''},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', options: ''},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', options: ''},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', options: ''},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', options: ''},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', options: ''},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', options: ''},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', options: ''},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', options: ''},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', options: ''},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', options: ''},
];

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'options'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  selectGalery = false;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  constructor(private dialog: MatDialog, 
              private utilService: UtilService,
              private personService: PersonService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  users = [ "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro",
            "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro",
            "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro"]

  editUser() {

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
