import { Component, OnInit } from '@angular/core';
import { Carousel } from 'src/app/models/carousel/Carousel.model';
import { AuthService, CarouselService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-carousel',
  templateUrl: './list-carousel.component.html',
  styleUrls: ['./list-carousel.component.css']
})
export class ListCarouselComponent implements OnInit {

  isAdmin: boolean = this._authService.isAdmin();
  carousel: Carousel[];
  load = false;

  constructor(
    private _authService: AuthService,
    private _carouselService : CarouselService
  ) { }

  ngOnInit(): void {
    this.load = true;
    this.getAllImages();
  }

  delete( data : Carousel ) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won`t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._carouselService.deleteCarousel(data.id).subscribe((res) => {
          this.getAllImages();
        });
        Swal.fire('Image was deleted successfully!', 'Click ok', 'success');
      }
    });
  }

  getAllImages() {
        this._carouselService.getAllCarousel().subscribe((info: any) => {
      this.carousel = info.data;
      this.load = false;
    });
  }

}
