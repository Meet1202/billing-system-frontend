import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(
    private http: HttpClient
  ) { }

  createBill(data: any, clientId: any){
    let options = {
      date: data.date,
      items: data.items,
      total_price: data.total_price,
      clientId: clientId
    }
    const createBillUrl = environment.apis + `bills/`;
    return this.http.post(createBillUrl, options)
  }

  getBillsList(clientId: any): any {
    const getBillListUrl = environment.apis + 'bills/all/'+ clientId;
    return this.http.get(getBillListUrl);
  }

  getBillById(){
    const getBillDetailUrl = environment.apis + 'bills/';
    return this.http.get(getBillDetailUrl)
  }

  updateBills(id: any, data: any){
    const updateBillUrl = environment.apis + `bills/${id}/update`;
    return this.http.put(updateBillUrl, data)
  }

  deleteBill(id: any){
    const deleteBillUrl = environment.apis +`bills/${id}`;
    return this.http.delete(deleteBillUrl);
  }

  searchBillByTerm(){
    const search = environment.apis + 'search';
    return this.http.get(search);
  }
}
