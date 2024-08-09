import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carousel } from 'src/app/models/carousel/Carousel.model';
import { CarouselLang } from 'src/app/models/carousel/CarouselLang.model';
import { CarouselService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-carousel',
  templateUrl: './new-carousel.component.html',
  styleUrls: ['./new-carousel.component.css']
})
export class NewCarouselComponent implements OnInit {

  carousel : FormGroup;
  carouselModel = new Carousel;
  carouselModelEn = new CarouselLang;
  carouselModelSp = new CarouselLang;

  validURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  button = 1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _carouselService : CarouselService ,
    private _router: Router
  ) { 
    this.carouselForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.createCarousel();
    } else {
      this.updateCarousel();
    }
  }

  createCarousel(){
    this.carouselModel.id = this.carousel.get('id').value;
    this.carouselModel.image = this.carousel.get('image').value;

      this._carouselService.createCarousel(this.carouselModel).subscribe(
      (resp: any) => {
        this.carouselModelEn.carousel_fk = resp.Id;
        this.carouselModelEn.languaje_c_category_fk = 1;
        this.carouselModelEn.message = this.carousel.get('messageEn').value;

        this.carouselModelSp.carousel_fk = resp.Id;
        this.carouselModelSp.languaje_c_category_fk = 2;
        this.carouselModelSp.message = this.carousel.get('messageSp').value;

        this.createCarouselDescription(this.carouselModelEn);
        this.createCarouselDescription(this.carouselModelSp);

        Swal.fire(
          'Image was added successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/carousel');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  updateCarousel(){
    
    this.carouselModel.id = this.carousel.get('id').value;
    this.carouselModel.image = this.carousel.get('image').value;

    this._carouselService.updateCarousel(this.carouselModel).subscribe(
      (resp: any) => {
        this.carouselModelEn.carousel_fk = resp.Id;
        this.carouselModelEn.languaje_c_category_fk = 1;
        this.carouselModelEn.message = this.carousel.get('messageEn').value;

        this.carouselModelSp.carousel_fk = resp.Id;
        this.carouselModelSp.languaje_c_category_fk = 2;
        this.carouselModelSp.message = this.carousel.get('messageSp').value;

        this.updateCarouselDescription(this.carouselModelEn);
        this.updateCarouselDescription(this.carouselModelSp);

        Swal.fire(
          'Image was updated successfully!',
          'Click ok',
          'success'
        );
        this._router.navigateByUrl('admin/list/carousel');
      },
      (error) => {
        Swal.fire('Error!', error.error.error, 'error');
      }
    );
  }

  createCarouselDescription( carousel : CarouselLang ){
    this._carouselService.createCarouselLang( carousel ).subscribe();
  }

  updateCarouselDescription( carousel : CarouselLang ){
    this._carouselService.updateCarouselLang( carousel ).subscribe();
  }

  loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.button = 2;
      this._carouselService
        .findCarouselById( id )
        .subscribe((res: any) => {
          this.carousel.controls['id'].setValue(res.data.id);
          this.carousel.controls['image'].setValue(res.data.image);

          this._carouselService
            .findCarouselByFk( res.data.id )
            .subscribe((res: any) => {
              this.carousel.controls['messageEn'].setValue(
                res.data[0].message
              );
              this.carousel.controls['messageSp'].setValue(
                res.data[1].message
              );
            });
        });
    }
  }

  get invalidMessageSp() {
    return (
      this.carousel.get('messageSp').invalid &&
      this.carousel.get('messageSp').touched
    );
  }
  get invalidMessageEn() {
    return (
      this.carousel.get('messageEn').invalid &&
      this.carousel.get('messageEn').touched
    );
  }
  get invalidImage() {
    return (
      this.carousel.get('image').invalid &&
      this.carousel.get('image').touched
    );
  }

  carouselForm() {
    this.carousel = this.fb.group({
      id: [''],
      image: ['', [Validators.required,Validators.maxLength(250)]],
      carousel_fk: [''],
      languaje_c_category_fk: [''],
      messageEn: ['', [Validators.required,Validators.maxLength(250)]],
      messageSp: ['', [Validators.required,Validators.maxLength(250)]],
    });
  }
}
