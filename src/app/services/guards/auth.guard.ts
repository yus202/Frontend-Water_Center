import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public router: Router ) {}

  canActivate() {
    var logged = localStorage.getItem( 'token' ) === null ? false : true;
    if ( !logged ){
      this.router.navigate( ['/home'] );
    }
    else
      return true;
  }

  
}
