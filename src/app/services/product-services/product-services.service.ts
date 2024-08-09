import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductService } from '../../models/product-service/ProductService.model';
import { ProductServiceLang } from '../../models/product-service/ProductServiceLang.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  productService: ProductService;
  productServiceLang: ProductServiceLang;

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
          'content-type': 'application/json'
      })
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token,
          'content-type': 'application/x-www-form-urlencoded'
        })
    };
  }

  getProductsAndServicesByLanguage(languageID): Observable<any>{
    return this.http.get(this.baseUrl + '/ServiceProducts/getProductAndServiceByLanguage/' + languageID);
  }

  public getAllProductServices() {
    return this.http.get( this.baseUrl + '/product/service', this.getOptionOne() );
  }

  public findProductServiceById( id : any ) {
    return this.http.get(
      this.baseUrl + '/product/service/' + id,
      this.getOptionOne()
    );
  }

  public findProductServiceByFk( id: any ) {
    return this.http.get(
      this.baseUrl + '/product/service/languaje/' + id,
      this.getOptionOne()
    );
  }
  public createProductService( product : ProductService ) {
    const json = JSON.stringify( product );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/product/service',
      params,
      this.getOptionTwo()
    );
  }

  public createProductServiceLang( product : ProductServiceLang ) {
    const json = JSON.stringify( product );
    const params = 'json=' + json;
    return this.http.post(
      
      this.baseUrl + '/product/service/languaje',
      params,
      this.getOptionTwo()
    );
  }

  public updateProductService( lider : ProductService ) {
    const json = JSON.stringify( lider );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/product/service/' + lider.id,
      params,
      this.getOptionTwo()
    );
  }
  
  public updateProductServiceLang( lider : ProductServiceLang ) {
    const json = JSON.stringify( lider );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/product/service/languaje/' + lider.product_service_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deleteProductService( id: number ) {
    return this.http.delete(
      this.baseUrl + '/product/service/' + id,
      this.getOptionOne()
    );
  }
}

