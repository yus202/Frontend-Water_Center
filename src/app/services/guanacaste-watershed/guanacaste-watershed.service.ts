import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GwdInfo } from 'src/app/models/gwd-info/gwd-info';
import { ConcienciaInfo } from 'src/app/models/Conciencia-info/conciencia-info/conciencia-info';
import { CompanyInfo } from 'src/app/models/company-info/company_info';

@Injectable({
  providedIn: 'root'
})
export class GuanacasteWatershedService {
 
  
  private GWDInfo = new BehaviorSubject<GwdInfo[]>(null);
  private Conciencia = new BehaviorSubject<ConcienciaInfo[]>(null);
  
   
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNandamojoInfo(IdLanguaje: number): any{
   return this.http.get(this.baseUrl + '/CompanyInfo/getGWDInfo/' + IdLanguaje);
  }
  
}
