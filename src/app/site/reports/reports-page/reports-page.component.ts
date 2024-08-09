import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  languageID: number;
  constructor(private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe( response => {
      this.languageID =  response;
    });
   }

  ngOnInit(): void {
  }

}
