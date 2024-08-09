import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';
import { GwcInfoService } from '../../../services/shared/gwc-info.service';
import { CompanyInfo } from 'src/app/models/company-info/company_info';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // variables
  language = 1;
  gwcInfo: any;
  // constructor
  constructor(private languageService: LanguageService, private gwcService: GwcInfoService) {
    // take the current language id an listen every time is switched
    this.gwcService.getGwcInfo().subscribe( response => {
      this.gwcInfo = response;
    });
  }

  ngOnInit(): void {
    this.languageService.loadLanguage(this.language);
  }

  // will change the the value on the service every time the user switch the language in the select tag
  switchLanguage(e): void{

    this.language = e.target.value;
    this.languageService.loadLanguage(this.language);
  }
}
