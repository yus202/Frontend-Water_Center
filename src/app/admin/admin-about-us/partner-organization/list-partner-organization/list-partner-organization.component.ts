import { Component, OnInit } from '@angular/core';
import { PartnerOrganization } from 'src/app/models/partner-organization/PartnerOrganization.model';


import Swal from 'sweetalert2'
import { AuthService } from '../../../../services/auth/auth.service';
import { PartnerOrganizationService } from '../../../../services/partner-organization/partner-organization.service';


@Component({
  selector: 'app-list-partner-organization',
  templateUrl: './list-partner-organization.component.html',
  styleUrls: ['./list-partner-organization.component.css']
})
export class ListPartnerOrganizationComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  partner : PartnerOrganization[];
  load = false;

  constructor( private partnerService : PartnerOrganizationService, private _authService : AuthService) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllPartnerOrganization();
  }

  getAllPartnerOrganization(){
    this.partnerService.getAllPartnerOrganization()
    .subscribe( ( info : any ) => { 
      this.partner = info.data;
      this.load = false;
    });
  }

  delete( data : PartnerOrganization ){
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
        this.partnerService.deletePartnerOrganization( data.id ).subscribe( res => {
          this.getAllPartnerOrganization();
        });
        Swal.fire(
          'Partner Organization was deleted successfully!',
          'Click ok',
          'success'
        )
      }
    })
  }

}
