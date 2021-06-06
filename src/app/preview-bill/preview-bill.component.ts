import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-preview-bill',
  templateUrl: './preview-bill.component.html',
  styleUrls: ['./preview-bill.component.scss']
})
export class PreviewBillComponent implements OnInit {

  bill: any;
  client: any;
  items: any;
  constructor(
    public dialogRef: MatDialogRef<PreviewBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.bill = this.data.bill;
    this.items = JSON.parse(this.data.bill.items);
    this.client = this.data.client;
  }
}
