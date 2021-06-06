import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditClientComponent} from "../add-edit-client/add-edit-client.component";
import {ClientsService} from "../../services/clients.service";
import {Clients} from "../models/clients";
import {ToastrService} from "ngx-toastr";
import {ConfirmBoxComponent} from "../confirm-box/confirm-box.component";
import {BillsService} from "../../services/bills.service";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  client = {} as Clients;
  clients: any = [];
  searchTerm: any;

  constructor(
    public dialog: MatDialog,
    private clientService:  ClientsService,
    private toastr: ToastrService,
    private titleService: Title,
    private changeRef: ChangeDetectorRef
  ) {
    this.titleService.setTitle('Clients');
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClientsList().subscribe((result: any)=>{
      this.clients = result.data;
      this.changeRef.detectChanges();
    }, (catchError: any) => {
      this.toastr.error(catchError.message);
    })
  }

  addClient() {
    let dialogRef = this.dialog.open(AddEditClientComponent, {panelClass: 'dialog-container-custom'});
    dialogRef.afterClosed().subscribe((result: any)=>{
      if(result){
        this.getClients();
      }
    });
  }

  removeClient(client: any) {
    const inputs = {
      confirmTitle: 'Confirm Prompt',
      confirmMessage: `Are you sure you want to delete "${client.office_name}"?`,
      okBtnText: 'Yes',
      cancelBtnText: 'No'
    }
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {width: '50%', data: inputs});
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.clientService.deleteClient(client.id).subscribe(()=>{
            this.toastr.success('Data deleted successfully!');
            this.getClients();
          },(catchError: any)=>{
            this.toastr.error(catchError, 'Error');
          });
        }else{
          console.log('cancel');
        }
    });
  }

  editClient(client: any) {
   let dialogRef = this.dialog.open(AddEditClientComponent, {
      data: {office_name: client.office_name, name: client.name, isEdit: true, id: client.id},
      panelClass: 'dialog-container-custom'
    });

   dialogRef.afterClosed().subscribe((result: any)=>{
     if(result){
       this.getClients();
     }
   });
  }
}
