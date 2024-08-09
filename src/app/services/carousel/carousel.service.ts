import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Carousel } from '../../models/carousel/Carousel.model';
import { CarouselLang } from '../../models/carousel/CarouselLang.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  baseUrl = environment.apiUrl;
  token: any;
  httpOptions: any;
  httpOptions2: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe(resp => {
      this.token = resp;
    });
  }

  getOptionOne(): any {
    return this.httpOptions = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json',
      }),
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/x-www-form-urlencoded',
      }),
    };
  }

  public getAllCarousel() {
    return this.http.get(this.baseUrl + '/carousel', this.getOptionOne());
  }

  public findCarouselById(id: any) {
    return this.http.get(
      this.baseUrl + '/carousel/' + id,
      this.getOptionOne());
  }

  public findCarouselByFk(id: any) {
    return this.http.get(
      this.baseUrl + '/carousel/languaje/' + id,
      this.getOptionOne());
  }

  public createCarousel(carousel: Carousel) {
    const json = JSON.stringify(carousel);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/carousel',
      params,
      this.getOptionTwo());
  }

  public createCarouselLang(carousel: CarouselLang) {
    const json = JSON.stringify(carousel);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/carousel/languaje',
      params,
      this.getOptionTwo());
  }

  public updateCarousel(carousel: Carousel) {
    const json = JSON.stringify(carousel);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/carousel/' + carousel.id,
      params,
      this.getOptionTwo());
  }

  public updateCarouselLang(carousel: CarouselLang) {
    const json = JSON.stringify(carousel);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/carousel/languaje/' + carousel.carousel_fk,
      params,
      this.getOptionTwo());
  }

  public deleteCarousel(id: number) {
    return this.http.delete(
      this.baseUrl + '/carousel/' + id,
      this.getOptionOne());
  }
}

