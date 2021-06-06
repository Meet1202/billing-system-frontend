import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  confirmTitle: any;
  confirmMessage: any;
  okBtnText: any;
  cancelBtnText: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.confirmTitle = this.data.confirmTitle || 'Confirm Prompt';
    this.confirmMessage = this.data.confirmMessage || 'Are you sure?';
    this.okBtnText = this.data.okBtnText || 'Yes';
    this.cancelBtnText = this.data.cancelBtnText || 'No';
  }

  cancelDialog(){
    this.dialogRef.close();
  }

  confirmDialog(){
    this.dialogRef.close('confirm');
  }
}
