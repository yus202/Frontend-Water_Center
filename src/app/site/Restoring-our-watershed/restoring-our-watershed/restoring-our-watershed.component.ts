import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-restoring-our-watershed',
  templateUrl: './restoring-our-watershed.component.html',
  styleUrls: ['./restoring-our-watershed.component.css']
})
export class RestoringOurWatershedComponent implements OnInit {

  Language: number;

  constructor(private LanguageId: LanguageService) {
    this.LanguageId.getLanguage().subscribe(Response => {
      this.Language = Response;
    });
   }

  ngOnInit(): void {
  }

}
