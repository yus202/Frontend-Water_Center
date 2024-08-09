import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoIng';

  constructor( public _settings : AccountSettingsService ){ }

}
