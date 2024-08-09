import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/shared/language.service';
import { BeesForTreesService } from '../../../services/bees-for-trees/bees-for-trees.service';

@Component({
  selector: 'app-bft-description',
  templateUrl: './bft-description.component.html',
  styleUrls: ['./bft-description.component.css']
})
export class BftDescriptionComponent implements OnInit {

  languageID: number;
  description: any;
  constructor(private languageService: LanguageService, private bftService: BeesForTreesService) {
      this.languageService.getLanguage().subscribe( (response: any) => {
        this.languageID =  response;
        this.getDescription();
      }, error => {
        console.log(error);
      });
   }

  ngOnInit(): void {
  }

  getDescription(): void {
    this.bftService.getBftDescription(this.languageID).subscribe( response => {
      if (response.status === 200)
      {
        this.description = response.data;
      }
    });
  }

}
