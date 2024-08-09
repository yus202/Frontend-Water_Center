import { Component, OnInit } from '@angular/core';
import { Donate } from 'src/app/models/donate/donate.model';

import Swal from 'sweetalert2'
import { AuthService } from '../../../../services/service.index';
import { DonateService } from '../../../../services/service.index';

@Component({
  selector: 'app-list-donate',
  templateUrl: './list-donate.component.html',
  styleUrls: ['./list-donate.component.css']
})
export class ListDonateComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  donate : Donate[];
  load = false;

  constructor( private _authService : AuthService, private donateService : DonateService ) { }

  ngOnInit(): void {
    this.load = true;
    this.getDonate();
  }

  getDonate(){
    this.donateService.getDonate()
    .subscribe( ( info : any ) => { 
      this.donate = info.data;
      this.load = false;
    });
  }

  delete( data : Donate ){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( ( result ) => {
      if ( result.isConfirmed ) {
        this.donateService.deleteDonate( data.id ).subscribe( res => {
          this.getDonate();
        });
        Swal.fire(
          'Donation was deleted successfully!',
          'Click ok',
          'success'
        )
      }
    })
  }

}

