import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {BillsListComponent} from "./bills-list/bills-list.component";
import {LayoutComponent} from "./layout/layout.component";
import {AuthGuard} from "../services/auth.guard";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: LayoutComponent,
  children: [
    {path: '', component: ClientListComponent, canActivate: [AuthGuard]},
    {path: 'billlist/:id', component: BillsListComponent, canActivate: [AuthGuard]}
  ]
  },
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
