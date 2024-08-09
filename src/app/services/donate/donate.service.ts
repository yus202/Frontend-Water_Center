import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Donate } from '../../models/donate/donate.model';
import { DonateLang } from '../../models/donate/donateLang.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

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


  public getDonate() {
    return this.http.get(this.baseUrl + '/donate', this.getOptionOne());
  }

  public getDonateByLanguaje(id: any) {
    return this.http.get(
      this.baseUrl + '/getDonateByLanguaje/' + id,
      this.getOptionOne()
    );
  }

  public findDonateById(id: any) {
    return this.http.get(
      this.baseUrl + '/donate/' + id,
      this.getOptionOne()
    );
  }

  public findDonateByFk(id_d: any) {
    return this.http.get(
      this.baseUrl + '/donate/languaje/' + id_d,
      this.getOptionOne()
    );
  }

  public createDonate(donate: Donate) {
    const json = JSON.stringify(donate);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/donate',
      params,
      this.getOptionTwo()
    );
  }
  public createDonateLang(donate: DonateLang) {
    const json = JSON.stringify(donate);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/donate/languaje',
      params,
      this.getOptionTwo()
    );
  }

  public updateDonate(donate: Donate) {
    const json = JSON.stringify(donate);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/donate/' + donate.id,
      params,
      this.getOptionTwo()
    );
  }
  public updateDonateLang(donate: DonateLang) {
    const json = JSON.stringify(donate);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/donate/languaje/' + donate.donate_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deleteDonate(id: number) {
    return this.http.delete(
      this.baseUrl + '/donate/' + id,
      this.getOptionOne()
    );
  }
}
