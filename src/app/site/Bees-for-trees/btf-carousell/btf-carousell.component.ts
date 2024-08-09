import { Component, OnInit } from '@angular/core';
import { BeesForTreesService } from '../../../services/bees-for-trees/bees-for-trees.service';
// import Swiper core and required modules
import SwiperCore, {Autoplay, EffectFade, Navigation, Pagination} from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

@Component({
  selector: 'app-btf-carousell',
  templateUrl: './btf-carousell.component.html',
  styleUrls: ['./btf-carousell.component.css']
})
export class BtfCarousellComponent implements OnInit {

  // Variables
  images: string;
  // Constructor
  constructor(private beesForTreesService: BeesForTreesService) { }

  ngOnInit(): void {
    this.getCarrouselImages();
  }

  getCarrouselImages(): void {
    this.beesForTreesService.getImages().subscribe( resp => {
      if (resp.status === 200)
      {
        this.images = resp.data;
      }
    });
  }

}
