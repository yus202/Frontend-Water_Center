import { Component, OnInit } from '@angular/core';
import { BoardDirectorService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-board-director',
  templateUrl: './board-director.component.html',
  styleUrls: ['./board-director.component.css']
})
export class BoardDirectorComponent implements OnInit {

  boardData: any;
  languageID: number;

  constructor(
    private languageService: LanguageService,
    private boardService : BoardDirectorService
  ) { 
    this.languageService.getLanguage().subscribe( response => {
      this.languageID = response;
      // if the language id is switched will get the info again
      this.getBoard();
    });
  }

  ngOnInit(): void {
  }

  getBoard(){
    this.boardService.getDirectorByLanguaje(this.languageID).subscribe( response => {

      if (response.status === 200){
        this.boardData = response.data;
      }

    });
  }

}
