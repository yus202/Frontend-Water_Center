import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { GroupLanguaje } from '../../models/events/GroupLanguaje ';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseUrl = environment.apiUrl;
  token: string;

  httpOptions2: any;
  httpOptions1: any;

  constructor(private http: HttpClient, private getToken: AuthService) {
    this.getToken.getToken().subscribe( resp => {
      this.token = resp;
    });
  }

   getOptionOne(): any {
    return this.httpOptions1 = {
      headers: new HttpHeaders({
          authorization: 'bearer ' + this.token
      })
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

  insertGroup(): Observable<any> {

    return this.http.post(this.baseUrl + '/Groups/storeGroup', null, this.getOptionOne());

  }

  insertGroupLanguaje(groupLanguaje: GroupLanguaje): Observable<any> {

    const json = JSON.stringify(groupLanguaje);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/Groups/storeLang', params, this.getOptionTwo());

  }

  getGroups(id: number): any {
    return this.http.get(this.baseUrl + '/Groups/index/' + id);
  }

  showGroup(groupId: number): any {
    return this.http.get(this.baseUrl + '/Groups/show/' + groupId, this.getOptionOne());
  }

  updateGroup(groupLanguaje: GroupLanguaje, groupId: number): any {
    const json = JSON.stringify(groupLanguaje);
    const params = 'json=' + json;
    return this.http.put(this.baseUrl + '/Groups/update/' + groupId, params, this.getOptionTwo());
  }

  deleteGroup(groupId: number): any {
    return this.http.delete(this.baseUrl + '/Groups/destroy/' + groupId, this.getOptionOne());
  }

}
