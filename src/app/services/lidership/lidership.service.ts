import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lidership } from '../../models/lideship/lidership.model';
import { LidershipLang } from '../../models/lideship/lidershipLang.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LidershipService {

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

  public getAllLiderships() {
    return this.http.get(this.baseUrl + '/lidership', this.getOptionOne());
  }

  public getLidershipByLanguaje(id: any) {
    return this.http.get(
      this.baseUrl + '/getLidershipByLanguaje/' + id,
      this.getOptionOne()
    );
  }

  public findLidershipById(id: any) {
    return this.http.get(
      this.baseUrl + '/lidership/' + id,
      this.getOptionOne()
    );
  }

  public findLidershipByFk(id_db: any) {
    return this.http.get(
      this.baseUrl + '/lidership/languaje/' + id_db,
      this.getOptionOne()
    );
  }

  public createLidership(lider: Lidership) {
    const json = JSON.stringify(lider);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/lidership',
      params,
      this.getOptionTwo()
    );
  }

  public createLidershipLang(lider: LidershipLang) {
    const json = JSON.stringify(lider);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/lidership/languaje',
      params,
      this.getOptionTwo()
    );
  }

  public updateLidership(lider: Lidership) {
    const json = JSON.stringify(lider);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/lidership/' + lider.id,
      params,
      this.getOptionTwo()
    );
  }

  public updateLidershipLang(lider: LidershipLang) {
    const json = JSON.stringify(lider);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/lidership/languaje/' + lider.liderships_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deleteLidership(id: number) {
    return this.http.delete(
      this.baseUrl + '/lidership/' + id,
      this.getOptionOne()
    );
  }

}
