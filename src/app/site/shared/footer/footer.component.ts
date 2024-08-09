import { Component, OnInit } from '@angular/core';
import { GwcInfoService } from '../../../services/shared/gwc-info.service';
import { CompanyInfo } from '../../../models/company-info/company_info';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // variables
  companyInfo: CompanyInfo[];
  year: number = new Date().getFullYear();
  languageID: number;

  // constructor
  constructor(private infoService: GwcInfoService, private laguageService: LanguageService)
  {
    this.infoService.getGwcInfo().subscribe( data => {
      this.companyInfo = data;
    });

    // Getting actual language
    this.laguageService.getLanguage().subscribe( response => {
      this.languageID = response;
    });
  }

  ngOnInit(): void {

  }

}
