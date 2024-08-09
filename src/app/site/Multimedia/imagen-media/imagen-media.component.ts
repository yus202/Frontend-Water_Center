import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-imagen-media',
  templateUrl: './imagen-media.component.html',
  styleUrls: ['./imagen-media.component.css']
})
export class ImagenMediaComponent implements OnInit {

  imagesData : any;
  languajeID: number;

  constructor(
    private _mediaService : MediaService, private LanguajeId: LanguageService
  ) { 
    this.LanguajeId.getLanguage().subscribe(LanguajeMedia =>{
      this.languajeID = LanguajeMedia;
      this.getAllImages();
  });
}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(){
    this._mediaService.getAllImages()
    .subscribe(
      ( resp : any ) => {
        this.imagesData = resp.data;
        console.log(resp.data);
        
      }
    )
  }

}
