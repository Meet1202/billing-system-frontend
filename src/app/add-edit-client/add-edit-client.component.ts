import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {

  isEdit: boolean;
  myForm = new FormGroup({
    office_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientsService,
    private toastr: ToastrService
  ) {
    this.isEdit = false;
    if(data){
      this.isEdit = data.isEdit;
      this.myForm.patchValue(data);
    }
  }

  ngOnInit(): void {
  }

  addEditClient(){
    if(this.isEdit){
      this.clientService.updateClients(this.data.id, this.myForm.value).subscribe((data)=>{
        this.toastr.success('Client updated successfully.');
        this.dialogRef.close(data);
      }, catchError=>{
        this.toastr.error(catchError);
        this.dialogRef.close();
      })
    }else{
      this.clientService.createClients(this.myForm.value).subscribe((data)=>{
        this.toastr.success('Client created successfully.');
        this.dialogRef.close(data);
      },catchError => {
        this.toastr.error(catchError);
        this.dialogRef.close();
      })
    }
  }
}
