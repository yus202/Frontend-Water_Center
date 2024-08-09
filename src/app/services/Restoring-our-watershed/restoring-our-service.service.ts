import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { GwdInfo  } from 'src/app/models/gwd-info/gwd-info';
import { GWDROW } from 'src/app/models/gwd-info/gwd-info';
import { environment } from 'src/environments/environment.prod';
import { RestoringOurWatershedModule } from 'src/app/models/restoring-our-watershed/restoring-our-watershed.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { AuthService } from '../auth/auth.service';
import { Strategy } from 'src/app/models/strategy/Strategy.model';
import { StrategyLanguaje } from 'src/app/models/strategy/StrategyLanguaje.model';
@Injectable({
  providedIn: 'root'
})
export class RestoringOurServiceService {

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

  getROWInfo(IdLanguaje: number): any{
    return this.http.get(this.baseUrl + '/CompanyInfo/getGWROWInfo/' + IdLanguaje);
  }
  getGROWInfo(IdLanguaje: number): any{
    return this.http.get(this.baseUrl + '/strategy/getStrategyInfo/' + IdLanguaje);
  }

  getAllStrategy() {
    return this.http.get(this.baseUrl + '/strategies', this.getOptionOne());
  }

  public findStrategyById(id: any): any {
    return this.http.get(
      this.baseUrl + '/strategiesbyId/' + id,
      this.getOptionOne());
  }

  public findStrategyByFk( fk: any): any {
    return this.http.get(
      this.baseUrl + '/strategiesByFk/' + fk,
      this.getOptionOne());
  }

  public createStrategy(strategy: Strategy): any {
    const json = JSON.stringify(strategy);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/strategy/store',
      params,
      this.getOptionTwo());
  }

  public createStrategyLang(strategy: StrategyLanguaje): any {
    const json = JSON.stringify(strategy);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/strategy/store/languaje',
      params,
      this.getOptionTwo());
  }

  public updatStrategy( strategy: Strategy ): any {
    const json = JSON.stringify( strategy);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/strategy/update/' +  strategy.id,
      params,
      this.getOptionTwo());
  }
  public updatStrategyLang( strategy: StrategyLanguaje): any {
    const json = JSON.stringify(strategy);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/strategy/languaje/update/' + strategy.strategy_fk,
      params,
      this.getOptionTwo());
  }
  public deleteStrategy(id: number): any {
    return this.http.delete(
      this.baseUrl + '/strategy/destroy/' + id,
      this.getOptionOne());
  }

}
