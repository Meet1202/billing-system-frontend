import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) {
  }

  createClients(data: any){
    let options = {
      name: data.name,
      office_name: data.office_name
    }
    const createClientUrl = environment.apis + 'clients/';
    return this.http.post(createClientUrl, options)
  }

  getClientsList(): any {
    const getClientListUrl = environment.apis + 'clients/all';
    return this.http.get(getClientListUrl);
  }

  getClientById(id: any){
    const getClientDetailUrl = environment.apis + 'clients/'+id;
    return this.http.get(getClientDetailUrl)
  }

  updateClients(id: any, data: any){
    const updateClientUrl = environment.apis + `clients/${id}/update`;
    return this.http.put(updateClientUrl, data)
  }

  deleteClient(id: any){
    const deleteClient = environment.apis +`clients/${id}`;
    return this.http.delete(deleteClient);
  }

  searchClientByTerm(){
    const search = environment.apis + 'search';
    return this.http.get(search);
  }
}
