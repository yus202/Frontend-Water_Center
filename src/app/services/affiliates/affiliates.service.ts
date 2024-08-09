import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Affiliate } from '../../models/affiliate/Affiliate.model';
import { AffiliateLang } from '../../models/affiliate/AffiliateLang.model';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {

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
        authorization: 'bearer ' + this.token,
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

  public getAllAffiliate(): any {
    return this.http.get(this.baseUrl + '/affiliate', this.getOptionOne());
  }

  public findAffiliateById(id: any) {
    return this.http.get(
      this.baseUrl + '/affiliate/' + id,
      this.getOptionOne());
  }

  public findAffiliateByFk(id: any) {
    return this.http.get(
      this.baseUrl + '/affiliate/languaje/' + id,
      this.getOptionOne());
  }

  public createAffiliate(affiliate: Affiliate) {
    const json = JSON.stringify(affiliate);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/affiliate',
      params,
      this.getOptionTwo());
  }


  public createAffiliateLang(affiliate: AffiliateLang) {
    const json = JSON.stringify(affiliate);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/affiliate/languaje',
      params,
      this.getOptionTwo());
  }

  public updateAffiliate(affiliate: Affiliate) {
    const json = JSON.stringify(affiliate);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/affiliate/' + affiliate.id,
      params,
      this.getOptionTwo());
  }

  public updateAffiliateLang(affiliate: AffiliateLang) {
    const json = JSON.stringify(affiliate);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/affiliate/languaje/' + affiliate.btf_affiliates_fk,
      params,
      this.getOptionTwo());
  }

  public deleteAffiliate(id: number) {
    return this.http.delete(
      this.baseUrl + '/affiliate/' + id,
      this.getOptionOne());
  }


}
