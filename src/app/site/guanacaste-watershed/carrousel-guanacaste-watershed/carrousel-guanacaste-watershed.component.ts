import { Component, OnInit } from '@angular/core';
import { RestoringOurServiceService } from 'src/app/services/Restoring-our-watershed/restoring-our-service.service';
import { CompanyInfoService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';
@Component({
  selector: 'app-carrousel-guanacaste-watershed',
  templateUrl: './carrousel-guanacaste-watershed.component.html',
  styleUrls: ['./carrousel-guanacaste-watershed.component.css']
})
export class CarrouselGuanacasteWatershedComponent implements OnInit {

  GWDROW: any;
  languajeID: number;

  constructor(
    private ROW: RestoringOurServiceService, 
    private LanguajeId: LanguageService,
    private _companyService : CompanyInfoService
    ) {
    this.LanguajeId.getLanguage().subscribe(LanguajeROW =>{
      this.languajeID = LanguajeROW;
      this.GetRestoringOurInfo();
    });
   }

  ngOnInit(): void {
    // this.getCompanyInfo();
  }

  GetRestoringOurInfo(): void{
    this.ROW.getGROWInfo(this.languajeID).subscribe(Info =>{
      this.GWDROW = Info.data;
    }); 
  }

  getCompanyInfo(){
    this._companyService.getAllCompany()
    .subscribe(
      ( response : any ) => {
        console.log(response);
        
      }
    )
  }

}
