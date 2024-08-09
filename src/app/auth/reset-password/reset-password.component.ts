import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: FormGroup;
  userModel: User = new User();

  constructor( private fb: FormBuilder, private _router: Router, private _auth_service: AuthService ) {
    this.formUser();
   }

  ngOnInit(): void {
  }

  onSubmit( ){
    
    this.userModel.email = this.user.get('email').value;
    this._auth_service.sendResetPassword(this.userModel)
    .subscribe(
      (response:any)=>{
        Swal.fire(
          response.message+'!',
          'You clicked the button!',
          'success'
        )
        this._router.navigateByUrl('home');
        
      },error =>{
        Swal.fire(
          error.error.error+'!',
          'You clicked the button!',
          'error'
        )
      })
  }

  get invalidEmail(): any {
    return (
      this.user.get('email').invalid &&
      this.user.get('email').touched
    );
  } 
  formUser(): void {
    this.user = this.fb.group({
      email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
}
