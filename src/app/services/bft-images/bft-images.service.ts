import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BftImages } from '../../models/bft-images/BftImages.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class BftImagesService {

  BftImages: BftImages;

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

  public getAllBftImages() {
    return this.http.get(this.baseUrl + '/bft/image', this.getOptionOne());
  }

  public findBftImageId(id: any) {
    return this.http.get(
      this.baseUrl + '/bft/image/' + id,
      this.getOptionOne());
  }

  public createBftImages(image: BftImages) {
    const json = JSON.stringify(image);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/bft/image',
      params,
      this.getOptionTwo());
  }

  public updateBftImage(image: BftImages) {
    const json = JSON.stringify(image);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/bft/image/' + image.id,
      params,
      this.getOptionTwo());
  }

  public deleteBftImages(id: number) {
    return this.http.delete(
      this.baseUrl + '/bft/image/' + id,
      this.getOptionOne());
  }

}
