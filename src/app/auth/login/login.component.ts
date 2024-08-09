import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { User } from '../../models/user/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  userModel: User = new User();
  show: boolean;

  constructor( private fb: FormBuilder, private _router: Router, private _auth_service: AuthService) {
    this.formUser();
  }

  ngOnInit(): void {
    if ( localStorage.getItem ){
      this.user.controls['email'].setValue( localStorage.getItem('email') );
      this.user.controls['remenberUser'].setValue( true );
    }
    this.show = false;
  }

  show_password(): void {
    this.show = !this.show;
}

  onSubmit( ): void {

    Swal.fire({
      allowOutsideClick : false,
      icon: 'info',
      title: 'Wait a Moment'
    });
    Swal.showLoading();

    this.userModel.email = this.user.get('email').value;
    this.userModel.password = this.user.get('password').value;

    this._auth_service.login( this.userModel).subscribe( resp => {
        Swal.close();
        this._router.navigateByUrl('admin/dashboard');
    }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Wrong Data. Please try Again'
        });
    });
  }

  get invalidEmail(): any {
    return (
      this.user.get('email').invalid &&
      this.user.get('email').touched
    );
  }
  get invalidPassword(): any {
    return (
      this.user.get('password').invalid &&
      this.user.get('password').touched
    );
  }
  formUser(): void {
    this.user = this.fb.group({
      email : ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required, Validators.minLength(8)]],
      remenberUser : [ false ]
    });
  }
}
