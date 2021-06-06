import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BillsService} from "../../services/bills.service";
import {ToastrService} from "ngx-toastr";

const _ = {
  compact: require('lodash/compact'),
  forEach: require('lodash/forEach'),
  remove: require('lodash/remove')
}

@Component({
  selector: 'app-add-edit-bill',
  templateUrl: './add-edit-bill.component.html',
  styleUrls: ['./add-edit-bill.component.scss']
})
export class AddEditBillComponent implements OnInit {

  total_price: number = 0;
  isEdit: boolean;
  isDisabled = true;
  myForm = new FormGroup({
    bill_number: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    items: this.fb.array([], [Validators.required]),
    total_price: new FormControl(0)
  });

  constructor(
    public dialogRef: MatDialogRef<AddEditBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private changeRef: ChangeDetectorRef,
    private billsService: BillsService,
    private toastr: ToastrService
  ) {
    this.isEdit = false;
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.isEdit = this.data.isEdit;
      this.setFormData();
    } else {
      this.addItems();
    }
  }

  calculatedTotalPrice() {
    this.total_price = 0;
    _.forEach(this.myForm.value.items, (item: any) => {
      const totalItemPrice = item.price * item.quantity;
      this.total_price += totalItemPrice;
    });
    if (!this.total_price) {
      this.total_price = 0;
    }

    this.changeRef.detectChanges();
  }

  addEditBill() {
    this.myForm.controls['total_price'].setValue(this.total_price);
    this.myForm.value.items = this.removeNullData();

    if(this.isEdit){
      this.billsService.updateBills(this.data.id, this.myForm.value).subscribe((data)=>{
        this.toastr.success('Bill updated successfully!');
        this.dialogRef.close(data);
      },error => {
        this.toastr.error(error);
        this.dialogRef.close();
      });
    }else{
      this.billsService.createBill(this.myForm.value, this.data.client_id).subscribe((data)=>{
        this.toastr.success('Bill created successfully!');
        this.dialogRef.close(data);
      },error => {
        this.toastr.error(error);
        this.dialogRef.close();

      });
    }
  }

  removeNullData(){
    return _.remove(this.myForm.value.items, (item: any) => {
      return item.name && item.quantity && item.price != '';
    });
  }

  items() {
    return this.myForm.get('items') as FormArray;
  }

  newItem(data?: any): FormGroup {
    return this.fb.group({
      name: data.name || '',
      quantity: data.quantity || '',
      price: data.price || ''
    })
  }

  addItems(arr?: any[]) {
    if (arr) {
      _.forEach(arr, (data: any) => {
        this.items().push(this.newItem(data));
      });
    } else {
      this.items().push(this.newItem({}));
    }
  }

  deleteItems(i: any) {
    this.items().removeAt(i);
    this.calculatedTotalPrice();
  }

  setFormData() {
    this.myForm.controls['date'].setValue(this.data.date);
    this.myForm.controls['bill_number'].setValue(this.data.bill_number);
    this.addItems(JSON.parse(this.data.items));
    this.total_price = this.data.total_price;
  }
}
