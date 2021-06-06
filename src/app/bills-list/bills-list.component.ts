import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditBillComponent} from "../add-edit-bill/add-edit-bill.component";
import {PreviewBillComponent} from "../preview-bill/preview-bill.component";
import {ActivatedRoute} from "@angular/router";
import {Clients} from "../models/clients";
import {BillsService} from "../../services/bills.service";
import {Bills} from "../models/bills";
import {ShowItemsComponent} from "../show-items/show-items.component";
import {ToastrService} from "ngx-toastr";
import {ConfirmBoxComponent} from "../confirm-box/confirm-box.component";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss']
})
export class BillsListComponent implements OnInit {
  client = {} as Clients;
  bill = {} as Bills;
  bills: any = [];
  client_id: any;
  searchTerm: any;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private billService: BillsService,
    private toastr: ToastrService,
    private clientService: ClientsService
  ) {

  }

  ngOnInit(): void {
    this.client_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClientById(this.client_id);
    this.getBills();
  }

  getClientById(id: string) {
    this.clientService.getClientById(id).subscribe((result: any)=>{
      this.client = result.data;
    }, error => {
      this.toastr.error(error);
    })
  }

  getBills() {
     this.billService.getBillsList(this.client_id).subscribe((result: any) => {
       this.bills = result.data;
     }, (error: any) => {
       this.toastr.error(error);
     });
  }

  addBill() {
    let dialogRef = this.dialog.open(AddEditBillComponent, {data: {client_id: this.client_id}, panelClass: 'dialog-container-custom'});
    dialogRef.afterClosed().subscribe(()=>{
      this.getBills();
    });
  }

  editBill(bill: any) {
    let dialogRef = this.dialog.open(AddEditBillComponent, {
      data: {
        id: bill.id,
        client_id: this.client_id,
        bill_number: bill.bill_number,
        date: bill.date,
        items: bill.items,
        total_price: bill.total_price,
        isEdit: true
      },
      panelClass: 'dialog-container-custom'
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.getBills();
    });
  }

  showItemsList(bill: any) {
    this.dialog.open(ShowItemsComponent, {
      data: {
        bill: bill
      },
      panelClass: 'dialog-container-custom'
    });
  }

  previewBill(bill: any) {
    this.dialog.open(PreviewBillComponent, {
      data: {bill: bill, client: this.client},
      panelClass: 'dialog-container-custom'
    });
  }

  removeBill(bill: any) {
    const inputs = {
      confirmTitle: 'Confirm Prompt',
      confirmMessage: `Are you sure you want to delete "${bill.bill_number}" bill?`,
      okBtnText: 'Yes',
      cancelBtnText: 'No'
    }
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {width: '50%', data: inputs});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.billService.deleteBill(bill.id).subscribe(()=>{
         this.toastr.success('Bill deleted successfully!');
         this.getBills();
       },error => {
         this.toastr.error(error);
       });
      } else {
        console.log('cancel');
      }
    });
  }
}
