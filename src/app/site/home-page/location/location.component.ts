import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  // variables
  languageID: number;
  // constructor
  constructor(private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe( response => {
      this.languageID = response;
    });
   }

  ngOnInit(): void {
  }

}
