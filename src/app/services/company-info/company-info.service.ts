import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { CompanyInfoLang } from 'src/app/models/company-info/CompanyInfoLang.model';
import { Images } from 'src/app/models/company-info/Images.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  // variables
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

  getNavInfo(): Observable<any> {
    return this.http.get(this.baseUrl + '/CompanyInfo/HeaderInfo');
  }

  getGWCInfo(languajeID): Observable<any> {
    return this.http.get(this.baseUrl + '/CompanyInfo/getGWCInfo/' + languajeID);
  }

  getCarouselInfo(languajeID): Observable<any> {
    return this.http.get(this.baseUrl + '/Carousel/index/' + languajeID);

  }
  getGWROWInfo(languajeID): Observable<any> {
    return this.http.get(this.baseUrl + 'CompanyInfo/getGWROWInfo/' + languajeID);
  }

  public getAllCompany() {
    return this.http.get(this.baseUrl + '/CompanyInfo/getAllCompany', this.getOptionOne());
  }
  public findCompanyInfoById(id: any): any {
    return this.http.get(
      this.baseUrl + '/CompanyInfo/listCompanyInfo/' + id,
      this.getOptionOne()
    );
  }
  public findCompanyInfoByFk(id: any): any {
    return this.http.get(
      this.baseUrl + '/CompanyInfo/listCompanyInfoLang/' + id,
      this.getOptionOne()
    );
  }
  public findImageByFk(id: any): any {
    return this.http.get(
      this.baseUrl + '/CompanyInfo/Images/' + id,
      this.getOptionOne()
    );
  }
  public createCompanyInfoLang(company: any): any {
    const json = JSON.stringify(company);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/CompanyInfo/storeCompanyLanguaje',
      params,
      this.getOptionTwo()
    );
  }
  public createCompanyInfo(company: any): any {
    const json = JSON.stringify(company);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/CompanyInfo/storeCompany',
      params,
      this.getOptionTwo()
    );
  }
  public createImage(image: Images): any {
    const json = JSON.stringify(image);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/CompanyInfo/storeImages',
      params,
      this.getOptionTwo()
    );
  }
  public updateCompanyInfo(company: any): any {
    const json = JSON.stringify(company);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/CompanyInfo/updateCompany/' + company.id,
      params,
      this.getOptionTwo()
    );
  }
  public updateImages(images: Images): any {
    const json = JSON.stringify(images);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/CompanyInfo/updateImages/' + images.company_info_fk,
      params,
      this.getOptionTwo()
    );
  }
  public updateCompanyInfoLang(company: CompanyInfoLang): any {
    const json = JSON.stringify(company);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/CompanyInfo/updateCompanyLanguaje/' + company.company_info_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deleteCompany(id: number): any {
    return this.http.delete(
      this.baseUrl + '/CompanyInfo/deleteCompany/' + id,
      this.getOptionOne()
    );
  }

}
