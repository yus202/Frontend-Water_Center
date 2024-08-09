import { Component, OnInit } from '@angular/core';
import { Affiliate } from 'src/app/models/affiliate/Affiliate.model';
import { AffiliatesService, AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-affiliates',
  templateUrl: './list-affiliates.component.html',
  styleUrls: ['./list-affiliates.component.css']
})
export class ListAffiliatesComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  affiliate: Affiliate[];
  load = false;

  constructor( private _authService: AuthService, 
    private _affiliateService : AffiliatesService ) { }

    ngOnInit(): void {
      this.load = true;
      this.getAllPointSales();
    }

    delete( data : Affiliate ) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._affiliateService.deleteAffiliate(data.id).subscribe((res) => {
            this.getAllPointSales();
          });
          Swal.fire( 'Affiliate was deleted successfully!', 'Click ok', 'success' );
        }
      });
    }
  
    getAllPointSales() {
      this._affiliateService.getAllAffiliate().subscribe((info: any) => {
        this.affiliate = info.data;
        this.load = false;
      });
    }

}
