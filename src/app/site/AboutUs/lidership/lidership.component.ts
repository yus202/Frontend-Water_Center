import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LidershipService } from 'src/app/services/lidership/lidership.service';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-lidership',
  templateUrl: './lidership.component.html',
  styleUrls: ['./lidership.component.css']
})
export class LidershipComponent implements OnInit {
  
    LidershipData: any;
    LanguageID: number;

  constructor(
    private languageService: LanguageService,
    private lidershipService: LidershipService,
    private route: Router
  ) { 
    this.languageService.getLanguage().subscribe(Response => {
      this.LanguageID = Response;

      this.getLidership();
    });
  }

  ngOnInit(): void {
  }
  getLidership(){
    this.lidershipService.getLidershipByLanguaje(this.LanguageID).subscribe( (response: any) =>{
        if (response.status === 200){
          this.LidershipData = response.data;
        }
    });
  }
}
