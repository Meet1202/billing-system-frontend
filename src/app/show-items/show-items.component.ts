import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss']
})
export class ShowItemsComponent implements OnInit {

  items: any;
  constructor(
    public dialogRef: MatDialogRef<ShowItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.items = JSON.parse(this.data.bill.items);
    }
  }

  showData(){

  }
}
