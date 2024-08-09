import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  setting : Setting = {
    themeUrl : 'assets/css/colors/default-dark.css',
    theme : 'default'
  };

  constructor( @Inject( DOCUMENT ) private _document ) { 
    this.loadSetting();
  }

  addSetting(){
    localStorage.setItem('setting',JSON.stringify( this.setting ));
  }
  loadSetting(){
    if(localStorage.getItem('setting')){
      this.setting = JSON.parse( localStorage.getItem('setting'));
      this.applyTheme( this.setting.theme );
    }else{
      this.applyTheme( this.setting.theme );
    }
  }

  applyTheme( theme : string){
    let url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href',url);
    this.setting.theme = theme;
    this.setting.themeUrl = url;
    this.addSetting();
  }

}

interface Setting{
  themeUrl : string;
  theme : string; 
}
