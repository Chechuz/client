import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];
  

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
  ){ }
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }
  

  createNewClient() {    
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });
      const dialogRef2 = this.dialog.open(DialogConfirmationComponent, {
        data:{title: "Nombre del Cliente", description: "¡Atención! <br> Si el nombre del Cliente es repetido no se guardarán los cambios"}
      });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }  

  editClient(client: Client) {
    alert("¡Recuerda!, Si el nombre ya existe no se guardarán los cambios");
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteClient(client: Client) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminarlo de todos modos?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  
}

