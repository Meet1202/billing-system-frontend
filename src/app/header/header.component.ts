import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ConfirmBoxComponent} from "../confirm-box/confirm-box.component";
import {MatDialog} from "@angular/material/dialog";

declare const window: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUserName: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '')
    this.currentUserName = user.name;
  }

  logout(){
    const inputs = {
      confirmTitle: 'Confirm Prompt',
      confirmMessage: 'Are you sure you want to logout?',
      okBtnText: 'Yes',
      cancelBtnText: 'No'
    }
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {width: '50%', data: inputs});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.signOut().subscribe(()=>{
          this.router.navigate(['']);
          localStorage.removeItem('user');
          this.toastr.success('Logout successfully!');
        }, error => this.toastr.error(error, 'Error'))
      }else{
        console.log('cancel');
      }
    });
  }

}
