import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { map, catchError  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile = new Subject<any>();
  // variables
  baseUrl = environment.apiUrl;
  user: User;
  token: any;
  Token = new BehaviorSubject<string>('null');
  // Constructor
  constructor( private http: HttpClient, public router: Router ) {
    this.loadToken(localStorage.getItem('token'));
    this.getToken().subscribe();
  }

  httpOptions1: any;
  HttpOption(){
    return this.httpOptions1 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token
      })
    };
  }

  httpOptions = {
    headers: new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem('token'),
      'content-type': 'application/json',
    }),
  };

  httpOptions2 = {
    headers: new HttpHeaders({
        authorization: 'bearer ' + localStorage.getItem('token'),
        'content-type': 'none'
      })
  };

  httpOptions3 = {
    headers: new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem( 'token' ),
      'content-type': 'application/x-www-form-urlencoded'
    }),
  };

  httpOptions4 = {
    headers: new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
    }),
  };

  getOptionOne(): any{
    const httpOptions = {
      headers: new HttpHeaders( { 'content-type': 'application/json' } )
    };
    return httpOptions;
  }

  refreshToken() {
    return this.http.post( this.baseUrl + '/auth/refresh', this.httpOptions2 );
  }

  saveStorage( id: string, image: string, name: string, email: string, token: string ): void {
    localStorage.setItem('id', id );
    localStorage.setItem('image', image);
    localStorage.setItem('name', name );
    localStorage.setItem('email', email );
    localStorage.setItem('token', token);
    this.token = token;
  }

  loadStorage(): void {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  isLoggued(): any {
    return ( localStorage.getItem( 'token' ).length > 5 ) ? true : false;
  }

  getAllUsers(){
    return this.http.get( this.baseUrl + '/auth/users', this.httpOptions );
  }
  registerUser( user : User ){
    const json = JSON.stringify( user );
    const params = 'json=' + json;
    
    return this.http.post(this.baseUrl + '/auth/register/', params, this.httpOptions3 );
  }

  login( user: User ): any {
    const json = JSON.stringify( user );
    return this.http.post(this.baseUrl + '/auth/login/', json, this.getOptionOne()).pipe(
      map(( res: any ) => {
        this.loadToken(res.token);
        this.saveStorage( res.id, res.image, res.name, res.email, res.token );
      })
    );
  }

  public updateUserProfile( user: User): any {
    this.profile.next(user.name);
    const json = JSON.stringify( user );
    const params = 'json=' + json;
    return this.http.put( this.baseUrl + '/auth/user/update/profile/'+ user.id, params, this.httpOptions3 );
  }
  getProfile() : Observable<any>{
    return this.profile.asObservable();
  }

  logout(): void {
    this.Token.next(null);
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'name' );
    localStorage.removeItem( 'image' );
    localStorage.removeItem( 'id');
  }

  isAdmin(): any {
    const role = localStorage.getItem('role');
    if ( role === '1' )
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getUserProfile( ): any {
    return this.http.get(this.baseUrl + '/auth/user/profile' , this.HttpOption());
  }

  public deleteUser( id: number ) {
    return this.http.delete(
      this.baseUrl + '/auth/deleteUser/' + id,
      this.httpOptions
    );
  }

  loadToken(token: string): void {
    this.token = token;
    this.Token.next(token);
  }

  getToken(): Observable<string> {
    if (this.Token.value === 'null')
    {
      this.token = localStorage.getItem('token');
      this.loadToken(this.token);
    }
    return this.Token.asObservable();
  }

  sendResetPassword( email : any){
    const json = JSON.stringify( email );
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/auth/sendPassword', params, this.httpOptions4);
  }
  ResetPassword( user : any){
    const json = JSON.stringify( user );
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/auth/resetPassword', params, this.httpOptions4);
  }

}

