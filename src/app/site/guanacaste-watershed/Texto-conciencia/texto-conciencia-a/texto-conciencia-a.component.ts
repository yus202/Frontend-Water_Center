import { Component, OnInit } from '@angular/core';
import { GwdInfo } from 'src/app/models/gwd-info/gwd-info';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { ConcienciaInfo } from 'src/app/models/Conciencia-info/conciencia-info/conciencia-info';
import { ConcienciaServiceService } from 'src/app/services/Conciencia-service/conciencia-service.service';

import { LanguageService } from 'src/app/services/shared/language.service';
@Component({
  selector: 'app-texto-conciencia-a',
  templateUrl: './texto-conciencia-a.component.html',
  styleUrls: ['./texto-conciencia-a.component.css']
})
export class TextoConcienciaAComponent implements OnInit {

  gwdInf: any;
  languajeID: number;

  constructor(private Conciencia: ConcienciaServiceService, private LanguajeId: LanguageService ) {
    this.LanguajeId.getLanguage().subscribe(LanguajeNanadamojo =>{
      this.languajeID = LanguajeNanadamojo;
      this.GetNandamojoInfo();
    });
  }
  ngOnInit(): void {
  }
  GetNandamojoInfo(): void{
    this.Conciencia.getNandamojoInfo(this.languajeID).subscribe(Info =>{
      this.gwdInf = Info.data;  
    });
  }
}
