import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events/events.service';
import { LanguageService } from '../../../services/shared/language.service';
// import Swiper core and required modules
import SwiperCore, {Autoplay, EffectFade, Navigation, Pagination} from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

@Component({
  selector: 'app-next-events',
  templateUrl: './next-events.component.html',
  styleUrls: ['./next-events.component.css']
})
export class NextEventsComponent implements OnInit {

  // variables
  languageID: number;
  events: any;
  // constructor
  constructor(private eventsService: EventsService, private languageService: LanguageService) {
    this.languageService.getLanguage().subscribe( response => {
      this.languageID = response;
      this.getEvents();
    });
   }

  ngOnInit(): void {
  }

  getEvents(): void {
    this.eventsService.getEvents(this.languageID).subscribe( response => {
      if (response.status === 200)
      {
        this.events = response.data;
      }
    });
  }


}
