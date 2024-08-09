import { Component, OnInit } from '@angular/core';
import { CompanyInfoLang } from 'src/app/models/company-info/CompanyInfoLang.model';
import { AuthService, CompanyInfoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { CompanyInfo } from '../../../../models/company-info/CompanyInfo.model';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {

  isAdmin : boolean = this._authService.isAdmin();
  company : any;
  load = false;

  constructor( private _authService : AuthService, private _companyService : CompanyInfoService ) { }

  ngOnInit(): void {
    this.load = true;
    this.getComapany();
  }

  companies = new Array<any>();
  getComapany(){
    this._companyService.getAllCompany()
    .subscribe( ( info : any ) => { 
      
      let arrayTemp = new Array<any>();
      this.companies = info.data;
      this.companies.forEach(element => {
        if (element.languaje_category_fk === 1) {
          arrayTemp.push(element);
        }
      });

      this.company = arrayTemp;
      
      // this.company = info.data;
      this.load = false;
    });
  }

  delete( data : CompanyInfoLang ){
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
        this._companyService.deleteCompany( data.company_info_fk ).subscribe( res => {
          this.getComapany();
        });
        Swal.fire(
          'Company was deleted successfully!',
          'Click ok',
          'success'
        )
      }
    })
  }


}
