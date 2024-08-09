import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonateService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  donateData: any;
    LanguageID: number;

  constructor(
    private languageService: LanguageService,
    private donateService: DonateService,
    private route: Router
  ) {
    this.languageService.getLanguage().subscribe(Response => {
      this.LanguageID = Response;

      this.getLidership();
    });
  }

  ngOnInit(): void {
  }
  getLidership(): void{
    this.donateService.getDonateByLanguaje(this.LanguageID).subscribe( (response: any) => {
        if (response.status === 200){
          this.donateData = response.data;
        }
    });
  }
}
