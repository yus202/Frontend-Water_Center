import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../services/service.index';
import { environment } from '../../../../environments/environment.prod';

import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : FormGroup;
  userModel = new User();

  constructor( private _authService: AuthService,private fb: FormBuilder ) {
    this.userForm();
   }

  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile(){
    this._authService.getUserProfile()
    .subscribe(
      ( response : any ) => {
        this.user.controls['id'].setValue(response.id);
        this.user.controls['name'].setValue(response.name);
        this.user.controls['email'].setValue(response.email);
        this.user.controls['image'].setValue(response.image);
      }
    )
    
  }



  ngSubmit( ){
    this.userModel.id = this.user.get('id').value;
    this.userModel.name = this.user.get('name').value;
    this.userModel.email = this.user.get('email').value;
    this.userModel.image = this.user.get('image').value;
    localStorage.setItem('name',this.user.get('name').value);
    this._authService.updateUserProfile( this.userModel )
    .subscribe(
      ( response : any ) => {
        this.getUserProfile();
        Swal.fire(
          'User was updated successfully!',
          'Click ok',
          'success'
        );
      },
      (error) => {
        console.log(error.error);
        
        Swal.fire('Error!', error.error.error, 'error');
      }
    )
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
  get invalidImage() {
    return (
      this.user.get('image').invalid &&
      this.user.get('image').touched
    );
  }
  userForm() {
    this.user = this.fb.group({
      id: [''],
      name: ['',[Validators.maxLength(22)]],
      email: ['',
      [ Validators.maxLength(250),
       Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      image: ['',[Validators.maxLength(250)]],
    });
  }

}