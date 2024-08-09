import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { StoreUnit } from 'src/app/models/events/StoreUnit';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  baseUrl = environment.apiUrl;
  token: string;
  httpOptions2: any;
  httpOptions1: any;

  constructor(private http: HttpClient, private getToken: AuthService) {
    this.getToken.getToken().subscribe( resp => {
      this.token = resp;
    });
   }

  getOptionOne(): any {
    return this.httpOptions1 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token
      })
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token,
          'content-type': 'application/x-www-form-urlencoded'
        })
    };
  }

  getUnits(languageID: number): any {
    return this.http.get(this.baseUrl + '/Units/index/' + languageID);
  }

  showUnit(unitId: number): any {
    return this.http.get(this.baseUrl + '/Units/show/' + unitId, this.getOptionOne());
  }

  insertUnit(): Observable<any> {
    return this.http.post(this.baseUrl + '/Units/StoreUnit', null, this.getOptionOne());
  }

  insertUnitLanguaje(unit: StoreUnit): Observable<any> {
    const json = JSON.stringify(unit);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/Units/storeLang', params, this.getOptionTwo());
  }

  updateUnit(unitLanguaje: StoreUnit, unitId: number): any {
    const json = JSON.stringify(unitLanguaje);
    const params = 'json=' + json;
    return this.http.put(this.baseUrl + '/Units/updateLang/' + unitId, params, this.getOptionTwo());
  }

  deleteUnit(unitID: number): any {
    return this.http.delete(this.baseUrl + '/Units/destroy/' + unitID, this.getOptionOne());
  }

}
