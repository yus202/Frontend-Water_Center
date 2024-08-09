import { Injectable } from '@angular/core';
import { PartnerOrganization } from '../../models/partner-organization/PartnerOrganization.model';
import { PartnerOrganizationLang } from '../../models/partner-organization/PartnerOrganizationLang.model';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PartnerOrganizationService {
  partnerOrganization: PartnerOrganization;
  partnerOrganizationLang: PartnerOrganizationLang;

  baseUrl = environment.apiUrl;
  token: string;

  httpOptions2: any;
  httpOptions1: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe( resp => {
      this.token = resp;
    });
  }

  getOptionOne(): any {
    return this.httpOptions1 = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + this.token,
        'content-type': 'application/json',
      })
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + this.token,
        'content-type': 'application/x-www-form-urlencoded',
      })
    };
  }

  public getAllPartnerOrganization() {
    return this.http.get(
      this.baseUrl + '/partnerOrganization',
      this.getOptionOne()
    );
  }

  public getPartnerByLanguaje( id: any) {
    return this.http.get(
      this.baseUrl + '/getPartnerByLanguaje/' + id,
      this.getOptionOne()
    );
  }

  public findPartnerOrganizationById(id: any) {
    return this.http.get(
      this.baseUrl + '/partnerOrganization/' + id,
      this.getOptionOne()
    );
  }

  public findPartnerOrganizationByFk(id_p: any) {
    return this.http.get(
      this.baseUrl + '/partnerOrganization/languaje/' + id_p,
      this.getOptionOne()
    );
  }

  public createPartnerOrganization(partner: PartnerOrganization) {
    const json = JSON.stringify(partner);
    const params = 'json=' + json;
    
    return this.http.post(
      this.baseUrl + '/partnerOrganization',
      params,
      this.getOptionTwo()
    );
  }

  public createPartnerOrganizationLang(partner: PartnerOrganizationLang) {
    const json = JSON.stringify(partner);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/partnerOrganization/languaje',
      params,
      this.getOptionTwo()
    );
  }

  public updatePartnerOrganization(partner: PartnerOrganization) {
    const json = JSON.stringify(partner);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/partnerOrganization/' + partner.id,
      params,
      this.getOptionTwo()
    );
  }

  public updatePartnerOrganizationLang(partner: PartnerOrganizationLang) {
    const json = JSON.stringify(partner);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl +
        '/partnerOrganization/languaje/' +
        partner.partner_organization_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deletePartnerOrganization(id: number) {
    return this.http.delete(
      this.baseUrl + '/partnerOrganization/' + id,
      this.getOptionOne()
    );
  }
}
