import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientListComponent } from './client-list/client-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BillsListComponent } from './bills-list/bills-list.component';
import {RouterModule} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';
import { AddEditBillComponent } from './add-edit-bill/add-edit-bill.component';
import {HttpClientModule} from "@angular/common/http";
import {ClientsService} from "../services/clients.service";
import { PreviewBillComponent } from './preview-bill/preview-bill.component';
import {AuthService} from "../services/auth.service";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {BillsService} from "../services/bills.service";
import { ShowItemsComponent } from './show-items/show-items.component';
import {ToastrModule} from "ngx-toastr";
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {httpInterceptorProviders} from "./http-interceptors";
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientListComponent,
    BillsListComponent,
    HeaderComponent,
    LayoutComponent,
    AddEditClientComponent,
    AddEditBillComponent,
    PreviewBillComponent,
    ShowItemsComponent,
    ConfirmBoxComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true,
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [ClientsService, AuthService, BillsService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
