import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    if(this.authService.isAlreadyLoggedIn()){
      this.router.navigate(['/home']);
    }
  }

  login(){
    this.authService.signIn(this.myForm.value.email, this.myForm.value.password).subscribe((result: any)=>{
      localStorage.setItem('user',JSON.stringify(result.data));
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.toastr.error(error.error.error.message.custom);
    });
  }
}
