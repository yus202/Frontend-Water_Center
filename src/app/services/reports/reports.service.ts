import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  // variables
  baseUrl = environment.apiUrl;
  variables: any; // it means different variables than the report has, will be taken from dropdowns and datepicker
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
    }),
  };

  constructor(private http: HttpClient) { }

  getPlantsQuantities(languageID: number): any {

    return this.http.get(this.baseUrl + '/reports/getTreesQuantities/' + languageID);
  }

  searchReportResults(variables: any): any {
    const json = JSON.stringify(variables);
    const params = 'json=' + json;

    return this.http.post(this.baseUrl + '/reports/getGeneralReports', params, this.httpOptions);
  }

}
