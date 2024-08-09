import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PointSale } from '../../models/point-sale/PointSale.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PointSaleService {

  PointSale : PointSale;

  baseUrl = environment.apiUrl;
  token: any;
  httpOptions2: any;
  httpOptions1: any;

  constructor( private http: HttpClient, private authService: AuthService ) {
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

  public getAllPointSale(): Observable<any> {
    return this.http.get( this.baseUrl + '/pointSale', this.getOptionOne() );
  }

  public findPointSaleById( id : any ) {
    return this.http.get(
      this.baseUrl + '/pointSale/' + id,
      this.getOptionOne()
    );
  }

  public findPointSaleByFk( id_p: any ) {
    return this.http.get(
      this.baseUrl + '/pointSale/languaje/' + id_p,
      this.getOptionOne()
    );
  }

  public createPointSale( point : PointSale ) {
    const json = JSON.stringify( point );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/pointSale',
      params,
      this.getOptionTwo()
    );
  }
 

  public updatePointSale( point : PointSale ) {
    const json = JSON.stringify( point );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/pointSale/' + point.id,
      params,
      this.getOptionTwo()
    );
  }

  public deletePointSale( id: number ) {
    return this.http.delete(
      this.baseUrl + '/pointSale/' + id,
      this.getOptionOne()
    );
  }
}


