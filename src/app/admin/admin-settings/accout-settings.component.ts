import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AccountSettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.css']
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public settingsService : AccountSettingsService ) { }

  ngOnInit(): void {
    this.addCheck();
  }

  changeColor( theme : string, link : any ){
    this.applyCheck( link ); 
    this.settingsService.applyTheme( theme );
  }

  applyCheck( link : any ) {
    let selectors : any = document.getElementsByClassName('selector');
    for ( let ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  addCheck() {
    let selectors : any = document.getElementsByClassName('selector');
    let theme = this.settingsService.setting.theme;
    for ( let ref of selectors ) {
      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
