import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Programs } from 'src/app/models/programs/Programs.model';
import { ProgramsLang } from 'src/app/models/programs/ProgramsLang.model';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  baseUrl = environment.apiUrl;
  token: any;
  httpOptions2: any;
  httpOptions1: any;

  constructor( private http: HttpClient, private authService: AuthService ) {
    this.authService.getToken().subscribe( resp => {
      this.token = resp;
    });
  }

  getOptionOne(): any {
    return this.httpOptions1 = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + this.token,
        'content-type': 'none'
      }),
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token,
          'content-type': 'application/x-www-form-urlencoded'
        })
    };
  }

  getProgramsByLanguage(languageID: number): any {
    return this.http.get(this.baseUrl + '/Programs/index/' + languageID);
  }

  public getAllPrograms() {
    return this.http.get( this.baseUrl + '/programs', this.getOptionOne());
  }

  public findProgramByFk( fk: any ) {
    return this.http.get(
      this.baseUrl + '/programs/' + fk,
      this.getOptionOne()
    );
  }

  public createProgram( program : Programs ) {
    const json = JSON.stringify( program );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/programs/',
      params,
      this.getOptionTwo()
    );
  }

  public createProgramLang( program : ProgramsLang ) {
    const json = JSON.stringify( program );
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/programs/languaje',
      params,
      this.getOptionTwo()
    );
  }

  public updateProgram( program : ProgramsLang ) {
    const json = JSON.stringify( program );
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/programs/languaje/' + program.program_fk,
      params,
      this.getOptionTwo()
    );
  }

  public deleteProgram( id: number ): any {
    return this.http.delete(
      this.baseUrl + '/programs/delete/' + id,
      this.getOptionOne()
    );
  }

}
