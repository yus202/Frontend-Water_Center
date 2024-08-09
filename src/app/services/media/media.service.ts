import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Media } from '../../models/media/Media.model';
import { MediaCategory } from '../../models/media/MediaCategory.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

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
      authorization: 'bearer ' + localStorage.getItem( 'token' ),
      'content-type': 'application/x-www-form-urlencoded',
    }),
  };
}

  public getAllImages() {
    return this.http.get( `${this.baseUrl}/getAllImages`, this.getOptionOne() );
  }

  public getAllVideos() {
    return this.http.get( `${this.baseUrl}/getAllVideos`, this.getOptionOne() );
  }

  public getAllmedia() {
    return this.http.get( `${this.baseUrl}/media`, this.getOptionOne() );
  }
  

  public getAllMedias() {
    return this.http.get( this.baseUrl + '/medias', this.getOptionOne() );
  }

  public getAllMediasCategory() {
    return this.http.get( this.baseUrl + '/media', this.getOptionOne() );
  }

  public findMediaById( id : any ) {
    return this.http.get(
      this.baseUrl + '/media/' + id,
      this.getOptionOne()
    );
  }

  public findMediaByFk( id: any ) {
    return this.http.get(
      this.baseUrl + '/media/category/' + id,
      this.getOptionOne()
    );
  }

  public createMedia( media : Media ) {
    const json = JSON.stringify( media );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/media',
      params,
      this.getOptionTwo()
    );
  }

  public createMediaCategory( media : MediaCategory ) {
    const json = JSON.stringify( media );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/media/category',
      params,
      this.getOptionTwo()
    );
  }

  public updateMedia( media : Media ) {
    const json = JSON.stringify( media );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/media/' + media.media_category_fk,
      params,
      this.getOptionTwo()
    );
  }
  
  public updateMediaCategory( media : MediaCategory ) {
    const json = JSON.stringify( media );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/media/category/' + media.id,
      params,
      this.getOptionTwo()
    );
  }

  public deleteMediaCategory( id: number ) {
    return this.http.delete(
      this.baseUrl + '/media/category' + id,
      this.getOptionOne()
    );
  }

  public deleteMedia( id: number ) {
    return this.http.delete(
      this.baseUrl + '/media/' + id,
      this.getOptionOne()
    );
  }

}

