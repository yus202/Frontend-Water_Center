import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/shared/language.service';
@Component({
  selector: 'app-guanacaste-watershed',
  templateUrl: './guanacaste-watershed.component.html',
  styleUrls: ['./guanacaste-watershed.component.css']
})
export class GuanacasteWatershedComponent implements OnInit {

  Language: number;

  constructor(private LanguageId: LanguageService) {
    this.LanguageId.getLanguage().subscribe(Response => {
      this.Language = Response;
    });
  }

  ngOnInit(): void {
  }

}
