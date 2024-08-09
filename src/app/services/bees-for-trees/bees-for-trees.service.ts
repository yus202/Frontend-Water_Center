import { Injectable } from '@angular/core';
import {​​​​​​​ Observable }​​​​​​​ from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BeesForTreesService {

  // variables
  baseUrl = environment.apiUrl;
  // constructor
  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(this.baseUrl + '/BftPage/carrouselImages');
  }

  getBftDescription(languageID): Observable<any> {
    return this.http.get(this.baseUrl + '/BftPage/description/' + languageID);
  }
}
