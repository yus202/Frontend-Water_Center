import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerOrganizationService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-partner-organizations',
  templateUrl: './partner-organizations.component.html',
  styleUrls: ['./partner-organizations.component.css']
})
export class PartnerOrganizationsComponent implements OnInit {

  OrganizationData: any;
  languageID: number;

  constructor(
    private languageService: LanguageService,
    private partnerService : PartnerOrganizationService,
    private route : Router
  ) { 
    this.languageService.getLanguage().subscribe( response => {
      this.languageID = response;
      // if the language id is switched will get the info again
      this.getOrganization();
    });
  }

  ngOnInit(): void {
  }

  getOrganization(){
    this.partnerService.getPartnerByLanguaje(this.languageID).subscribe( ( response: any ) => {

      if (response.status === 200){
        this.OrganizationData = response.data;
      }

    });
  }
  navigate( url : any ){
    this.route.navigateByUrl(url);
  }

}
