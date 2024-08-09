import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/shared/language.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  Language: number;

  constructor(private languageid: LanguageService) {
    this.languageid.getLanguage().subscribe(Response => {
      this.Language = Response;
    });
   }

  ngOnInit(): void {
  }

}
