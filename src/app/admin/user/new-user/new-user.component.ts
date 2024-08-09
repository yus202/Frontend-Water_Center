import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  user : FormGroup;
  userModel = new User();
  password = true;
  show: boolean;

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
  }

  show_password() {
    this.show = !this.show;
}

  onSubmit(){
    this.userModel.id = this.user.get('id').value;
    this.userModel.name = this.user.get('name').value;
    this.userModel.email = this.user.get('email').value;
    this.userModel.password = this.user.get('password').value;
    this.userModel.password_confirmation = this.user.get('password_confirmation').value;
    this.userModel.image = this.user.get('image').value;
    
    if (this.equalsPassword(this.userModel.password,this.userModel.password_confirmation)) {
      this._authService.registerUser( this.userModel )
    .subscribe(
      ( response  : any ) => {
        Swal.fire(
          'User was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/user/list');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
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

  get invalidName() {
    return (
      this.user.get('name').invalid &&
      this.user.get('name').touched
    );
  }
  get invalidEmail() {
    return (
      this.user.get('email').invalid &&
      this.user.get('email').touched
    );
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
          name:  ['', [Validators.required]],
          email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          image : ['1tGVpxw-pEEm7Ct1iZFhWi39_0wQj2e6q'],
          password:  ['', [Validators.required, Validators.minLength(8)]],
          password_confirmation: ['', [Validators.required]]
    });
  }

}
