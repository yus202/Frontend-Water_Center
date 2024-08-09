import { Component, OnInit } from '@angular/core';
import { AffiliatesService } from '../../../services/affiliates/affiliates.service';
import { LanguageService } from '../../../services/shared/language.service';

@Component({
  selector: 'app-bft-affiliates',
  templateUrl: './bft-affiliates.component.html',
  styleUrls: ['./bft-affiliates.component.css']
})
export class BftAffiliatesComponent implements OnInit {

  // variables
  affiliates: any;
  languageID: number;

  constructor(private affiliatesService: AffiliatesService, private languageService: LanguageService) { 
    this.languageService.getLanguage().subscribe( (response: any) => {
      this.languageID =  response;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getAffiliates();
  }

  getAffiliates(): void{
    this.affiliatesService.getAllAffiliate().subscribe(response => {
      this.affiliates = response.data;
    });
  }

}
