import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeDom'
})
export class SafeDomPipe implements PipeTransform {

  constructor( private _domSanitizer: DomSanitizer ) {}

  transform( value : any, ...args: any[] ): SafeResourceUrl {
      return this._domSanitizer.bypassSecurityTrustResourceUrl( value );
  }

}
