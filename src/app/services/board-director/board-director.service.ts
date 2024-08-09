import { Injectable } from '@angular/core';
import { boardDirectors } from '../../models/board-director/boardDirectors.model';
import { boardDirectorsLang } from '../../models/board-director/boardDirectorsLang.model';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BoardDirectorService {

  baseUrl = environment.apiUrl;
  token: any;
  httpOptions: any;
  httpOptions2: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe(resp => {
      this.token = resp;
    });
  }

  getOptionOne(): any {
    return this.httpOptions = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json',
      }),
    };
  }

  getOptionTwo(): any {
    return this.httpOptions2 = {
      headers: new HttpHeaders({
        authorization: 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/x-www-form-urlencoded',
      }),
    };
  }

  public getAllBoardDirector() {
    return this.http.get(this.baseUrl + '/board/director', this.getOptionOne());
  }

  public getDirectorByLanguaje(id: any): any {
    return this.http.get(
      this.baseUrl + '/getDirectorByLanguaje/' + id,
      this.getOptionOne());
  }

  public findBoardDirectorsById(id: any): any {
    return this.http.get(
      this.baseUrl + '/board/director/' + id,
      this.getOptionOne());
  }

  public findBoardDirectorsByFk(id_db: any): any {
    return this.http.get(
      this.baseUrl + '/board/director/languaje/' + id_db,
      this.getOptionOne());
  }

  public createBoardDirector(board: boardDirectors): any {
    const json = JSON.stringify(board);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/board/director',
      params,
      this.getOptionTwo());
  }
  public createBoardDirectorLang(board: boardDirectorsLang): any {
    const json = JSON.stringify(board);
    const params = 'json=' + json;
    return this.http.post(
      this.baseUrl + '/board/director/languaje',
      params,
      this.getOptionTwo());
  }

  public updateBoardDirector(info: boardDirectors): any {
    const json = JSON.stringify(info);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/board/director/' + info.id,
      params,
      this.getOptionTwo());
  }
  public updateBoardDirectorLang(info: boardDirectorsLang): any {
    const json = JSON.stringify(info);
    const params = 'json=' + json;
    return this.http.put(
      this.baseUrl + '/board/director/languaje/' + info.board_directors_fk,
      params,
      this.getOptionTwo());
  }

  public deleteBoardDirector(id: number): any {
    return this.http.delete(
      this.baseUrl + '/board/director/' + id,
      this.getOptionOne());
  }

}
