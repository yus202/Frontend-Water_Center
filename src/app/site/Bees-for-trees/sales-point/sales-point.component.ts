import { Component, OnInit } from '@angular/core';
import { PointSaleService } from '../../../services/point-sale/point-sale.service';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.css']
})
export class SalesPointComponent implements OnInit {

  // variables
  languageID: number;
  salesPoint: any;
  constructor(private pointOfSales: PointSaleService, private languageService: LanguageService) { 
    this.languageService.getLanguage().subscribe( (response: any) => {
      this.languageID =  response;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getPontOfSales();
  }

  getPontOfSales(): void{
    this.pointOfSales.getAllPointSale().subscribe( response => {
      this.salesPoint = response.data;
    });
  }

}