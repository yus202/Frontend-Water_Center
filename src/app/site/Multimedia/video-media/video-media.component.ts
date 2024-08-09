import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/service.index';
import { LanguageService } from 'src/app/services/shared/language.service';

@Component({
  selector: 'app-video-media',
  templateUrl: './video-media.component.html',
  styleUrls: ['./video-media.component.css'],
})
export class VideoMediaComponent implements OnInit {
  languajeID: number;
  videoData: any;

  constructor(
    private _mediaService: MediaService,
    private LanguajeId: LanguageService
  ) {
    this.LanguajeId.getLanguage().subscribe((LanguajeMedia) => {
      this.languajeID = LanguajeMedia;
      this.getAllVideos();
    });
  }

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this._mediaService.getAllVideos().subscribe((resp: any) => {
      this.videoData = resp.data;
      console.log(resp.data);
    });
  }
}
