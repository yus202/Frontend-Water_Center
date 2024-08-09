import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnInit {

  titleBreadcrumbs : any;

  constructor( private router : Router, 
               private title : Title,
               private meta : Meta ) { 
    this.getDataRoute()
    .subscribe( data => {
      this.titleBreadcrumbs = data.tittle;
      this.title.setTitle( this.titleBreadcrumbs );
    });
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( ( event : ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event : ActivationEnd ) => event.snapshot.data )
   )
   const metaTag : MetaDefinition = {
     name : 'Description',
     content : this.titleBreadcrumbs
   };
   this.meta.updateTag( metaTag );
  }

}
