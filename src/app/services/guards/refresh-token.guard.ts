import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {

  constructor( public _authSerice : AuthService,
                public _router : Router 
    ){

  }

  canActivate(): Promise<boolean> | boolean {
    
    let token = this._authSerice.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));
    
    let expired = this.expiredToken( payload.exp );

    if( expired ){ 
      this._authSerice.logout();
      this._router.navigate(['/home']);
      return false;
    }

    return this.checkNewToken( payload.exp );
  }

  checkNewToken( timeExp : number ) : Promise<boolean>{
    
    return new Promise( ( resolve, reject ) =>{

      let tokenExp = new Date( timeExp * 1000 );
      let now = new Date();

      now.setTime( now.getTime() + ( 1 * 60 * 60 * 1000 ) );
      
      if( tokenExp.getTime() > now.getTime() ){
        
        resolve(true);
      }else{
        this._router.navigate(['/home']);
        
      }

    });
  }

  expiredToken( timeExp : number){
     let date = new Date().getTime() / 1000;

     if( timeExp < date ){
       return true;
     }
     else{
       return false;
     }
  }
  
}
