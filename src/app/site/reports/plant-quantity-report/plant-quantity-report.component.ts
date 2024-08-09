import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports/reports.service';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-plant-quantity-report',
  templateUrl: './plant-quantity-report.component.html',
  styleUrls: ['./plant-quantity-report.component.css']
})
export class PlantQuantityReportComponent implements OnInit {

  // variables
  languageID: number;
  plantsQuantities: any;
  message: string;
  constructor(private reportsService: ReportsService, private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe( response => {
      this.languageID =  response;
      this.getPlantsQuantities();
    });
  }

  ngOnInit(): void {
  }

  getPlantsQuantities(): void {
    this.reportsService.getPlantsQuantities(this.languageID).subscribe(response => {
      if (response.status === 200){
        this.plantsQuantities = response.data;
      }
      if (response.status === 204){
        this.message = 'no content found';
      }
      console.log(this.plantsQuantities);
    });
  }
}
