import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-third-nav',
  templateUrl: './third-nav.component.html',
  styleUrls: ['./third-nav.component.css']
})
export class ThirdNavComponent implements OnInit {

  @Input() Name: string;

  constructor() {
   }

  ngOnInit(): void {

  }

}
