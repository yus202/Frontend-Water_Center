import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  user : FormGroup;
  userModel = new User();
  password = true;
  show: boolean;
  token : any;

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _authService : AuthService,
    private _router: Router
  ) {
    this.userForm();
    this.show = false;
   }

  ngOnInit(): void {
    this.loadData();
  }

  show_password() {
    this.show = !this.show;
}

  onSubmit(){
    this.userModel.id = this.user.get('id').value;
    this.userModel.email = this.user.get('email').value;
    this.userModel.password = this.user.get('password').value;
    this.userModel.password_confirmation = this.user.get('password_confirmation').value;
    this.userModel.token = this.token;
    
    if (this.equalsPassword(this.userModel.password,this.userModel.password_confirmation)) {

      this._authService.ResetPassword(this.userModel)
      .subscribe(
        (response:any)=>{
          Swal.fire(
            'Your password has been updated!',
            'Click ok',
            'success'
          );
          this._router.navigateByUrl('login');
        },error =>{
          Swal.fire(
            'You have someone error!',
            'Click ok',
            'error'
          );
        }
      )

    }
    
    
  }

  equalsPassword( pass1 : any, pass2 : any) : boolean{
    if (pass1 === pass2) 
     return this.password = true;
      else 
      return this.password = false;
  }

  loadData(){
    const email = this._route.snapshot.paramMap.get('email');
    this.token = this._route.snapshot.paramMap.get('token');
    this.user.controls['email'].setValue( email );
  }
 
  get invalidPassword() {
    return (
      this.user.get('password').invalid &&
      this.user.get('password').touched
    );
  }
  get invalidConfirmPassword() {
    return (
      this.user.get('password_confirmation').invalid &&
      this.user.get('password_confirmation').touched
    );
  }

  userForm(){
    this.user = this._fb.group({
          id: [''],
          email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          password:  ['', [Validators.required, Validators.minLength(8)]],
          password_confirmation: ['', [Validators.required]]
    });
  }

}
