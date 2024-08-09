import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyInfo } from 'src/app/models/company-info/company_info';

@Injectable({
  providedIn: 'root'
})
export class GwcInfoService {

  private gwcInfo = new BehaviorSubject<CompanyInfo[]>(null);

  constructor() { }

  loadInfo(info: CompanyInfo[]): void {
    this.gwcInfo.next(info);
  }

  getGwcInfo(): Observable<CompanyInfo[]>{
    return this.gwcInfo.asObservable();
  }
}
