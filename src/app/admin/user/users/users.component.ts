import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  cargando: boolean = false;
  users : User[];
  totalRegistros : number;

  constructor(
    private _authService : AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this._authService.getAllUsers()
    .subscribe(
      ( response : any ) => {
        this.totalRegistros = response.length;
        
        this.users = response;
      }
    )
  }

  delete( data : any ){
    this._authService.deleteUser( data.id )
    .subscribe(
      ( response : any ) =>{
        this.getAllUser();
        Swal.fire(
          'User was deleted successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/user/list');
      })
  }

}
