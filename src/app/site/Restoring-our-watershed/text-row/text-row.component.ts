import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { LanguageService } from 'src/app/services/shared/language.service';
import { RestoringOurServiceService } from 'src/app/services/Restoring-our-watershed/restoring-our-service.service';
import { GuanacasteWatershedService } from 'src/app/services/guanacaste-watershed/guanacaste-watershed.service';
@Component({
  selector: 'app-text-row',
  templateUrl: './text-row.component.html',
  styleUrls: ['./text-row.component.css']
})
export class TextROWComponent implements OnInit {

  gwrow: any;
  LanguajeID: number;

  constructor(private ROW: RestoringOurServiceService, private LanguajeId: LanguageService) {
    this.LanguajeId.getLanguage().subscribe(LanguajeROW =>{
      this.LanguajeID = LanguajeROW;
      this.GetROWInfo();
    });
   }

  ngOnInit(): void {
  }
  GetROWInfo(): void{
    this.ROW.getROWInfo(this.LanguajeID).subscribe(Info =>{
      this.gwrow = Info.data;
      console.log(this.gwrow);
    });
  }
}
