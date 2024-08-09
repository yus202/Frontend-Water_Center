import { Component, OnInit } from '@angular/core';
import { GuanacasteWatershedService } from '../../../services/guanacaste-watershed/guanacaste-watershed.service';
import { GwdInfo } from 'src/app/models/gwd-info/gwd-info';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { LanguageService } from 'src/app/services/shared/language.service';
@Component({
  selector: 'app-text-wtd',
  templateUrl: './text-wtd.component.html',
  styleUrls: ['./text-wtd.component.css']
})
export class TextWtdComponent implements OnInit {

  gwdInfo: any;
  languajeID: number;

  constructor(private GWD: GuanacasteWatershedService, private LanguajeId: LanguageService ) {
    this.LanguajeId.getLanguage().subscribe(LanguajeNanadamojo =>{
      this.languajeID = LanguajeNanadamojo;
      this.GetNandamojoInfo();
    });
  }

  
  ngOnInit(): void {
  }

  GetNandamojoInfo(): void{
    this.GWD.getNandamojoInfo(this.languajeID).subscribe(Info =>{
      this.gwdInfo = Info.data;  
    });
  }
}
