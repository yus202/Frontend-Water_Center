import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-bees-for-trees-page',
  templateUrl: './bees-for-trees-page.component.html',
  styleUrls: ['./bees-for-trees-page.component.css']
})
export class BeesForTreesPageComponent implements OnInit {

  languageID: number;
  constructor(private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe( response => {
      this.languageID =  response;
    });
  }

  ngOnInit(): void {
  }

}
