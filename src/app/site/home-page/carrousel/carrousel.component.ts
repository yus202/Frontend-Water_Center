import { Component, OnInit, Input } from '@angular/core';
import { CompanyInfoService } from '../../../services/company-info/company-info.service';
import { LanguageService } from '../../../services/shared/language.service';
// import Swiper core and required modules
import SwiperCore, {Autoplay, EffectFade, Navigation, Pagination} from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  // variables
  carrouselData: any;
  languageID: number;
  // constructor
  constructor(private languageService: LanguageService, private companyInfoService: CompanyInfoService) {

    // take the current language id an listen every time is switched
    this.languageService.getLanguage().subscribe( response => {
      this.languageID = response;
      // if the language id is switched will get the info again
      this.getCarrouselData();
    });

   }

  ngOnInit(): void {

  }

  // this function will take carrousel's data with the language id provided by the service
  getCarrouselData( ): void {

    this.companyInfoService.getCarouselInfo(this.languageID).subscribe( response => {

      if (response.status === 200){
        this.carrouselData = response.data;
      }

    });

  }

}
