import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UtilService } from 'src/app/shared/util/util.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  constructor(private dialog: MatDialog, private utilService: UtilService) { }

  ngOnInit() {
  }

  users = [ "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro",
            "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro",
            "Arley", "Ribeiro", "Arley", "Ribeiro", "Ribeiro", "Arley ribeiro", "ribeiro", "ribeiro"]

  deleteUser() {
    //callDialog(dialog, component, title, content, buttonConfirm, buttonCancel)
    var dialogRef = this.utilService.callDialog(this.dialog, DialogComponent, "Remover um usuário", "Ao realizar essa operação todas as informações referentes à esse usuário serão bloqueadas.", "Confirmar", "Cancelar", "35%");
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
}
