import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { GwcInfoService } from '../../../services/shared/gwc-info.service';

@Component({
  selector: 'app-gwc-description',
  templateUrl: './gwc-description.component.html',
  styleUrls: ['./gwc-description.component.css']
})
export class GwcDescriptionComponent implements OnInit {

  // variables
  companyInfo: CompanyInfo[];

  constructor(private gwcInfo: GwcInfoService) {
    this.gwcInfo.getGwcInfo().subscribe(info => {
      this.companyInfo = info;
    });
   }

  ngOnInit(): void {
  }


}
