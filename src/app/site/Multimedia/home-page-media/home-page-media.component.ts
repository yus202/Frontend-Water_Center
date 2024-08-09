import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';
@Component({
  selector: 'app-home-page-media',
  templateUrl: './home-page-media.component.html',
  styleUrls: ['./home-page-media.component.css']
})
export class HomePageMediaComponent implements OnInit {

  languageID: number;

  constructor(private languageid: LanguageService) {
    this.languageid.getLanguage().subscribe(Response => {
      this.languageID = Response;
    });
   
  }

  ngOnInit(): void {
   // this.languageService.getLanguage().subscribe( (response : any) => {
     // console.log( response );
      // this.languageID =  response;
   // });
  }

}
