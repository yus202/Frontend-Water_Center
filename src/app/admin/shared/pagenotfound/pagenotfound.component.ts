import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/app/models/company-info/company_info';
import { GwcInfoService } from 'src/app/services/shared/gwc-info.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  date = new Date().getUTCFullYear();
  
  constructor( ) { }

  ngOnInit(): void {
    this.date;
  }

}
