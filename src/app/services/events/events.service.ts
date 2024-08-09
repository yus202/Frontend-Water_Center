import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { EventLanguage } from '../../models/events/EventLanguage ';
import { AuthService } from '../../services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = environment.apiUrl;
  token: string;

  httpOptions2: any;
  httpOptions1: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe( resp => {
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

  getEventUnits(eventID: number, languajeID: number): any {
    return this.http.get(this.baseUrl + '/EventUnits/index/' + eventID + '/' + languajeID);
  }

  getEventGroups(eventID: number, languajeID: number): any {
    return this.http.get(this.baseUrl + '/EventGroup/index/' + eventID + '/' + languajeID);
  }

  getEvents(languageID): Observable<any>{
    return this.http.get(this.baseUrl + '/Events/index/' + languageID);
  }

  showEventInfoById(eventId: number): any {
    return this.http.get(this.baseUrl + '/Events/show/' + eventId, this.getOptionOne());
  }

  insertEvent(eventModel: any): Observable<any> {
    const json = JSON.stringify(eventModel);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/Events/storeEvent', params, this.getOptionTwo());
  }

  insertEventLanguage(eventLanguage: EventLanguage): Observable<any> {
    const json = JSON.stringify(eventLanguage);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/Events/storeLanguaje', params, this.getOptionTwo());
  }

  insertEventUnit(eventUnit: any): any {
    const json = JSON.stringify(eventUnit);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/EventUnits/store', params, this.getOptionTwo());
  }

  insertEventGroup(eventGroup: any): any {
    const json = JSON.stringify(eventGroup);
    const params = 'json=' + json;
    return this.http.post(this.baseUrl + '/EventGroup/store', params, this.getOptionTwo());
  }

  updateEvent(eventModel: any, eventId: number): any {
    const json = JSON.stringify(eventModel);
    const params = 'json=' + json;
    return this.http.put(this.baseUrl + '/Events/updateEvent/' + eventId, params, this.getOptionTwo());
  }

  updateEventLanguage(eventLanguageModel: any, eventId: number): any {
    const json = JSON.stringify(eventLanguageModel);
    const params = 'json=' + json;
    return this.http.put(this.baseUrl + '/Events/updateLanguaje/' + eventId, params, this.getOptionTwo());
  }

  deleteEvent(eventId): any {
    return this.http.delete(this.baseUrl + '/Events/destroy/' + eventId, this.getOptionOne());
  }

  deleteEventGroup(eventGroupID): any {
    return this.http.delete(this.baseUrl + '/EventGroup/destroy/' + eventGroupID, this.getOptionOne());
  }

  deleteEventUnit(eventUnitID): any {
    return this.http.delete(this.baseUrl + '/EventUnits/destroy/' + eventUnitID, this.getOptionOne());
  }

  deleteAllEventUnits(eventUnitID): any {
    return this.http.delete(this.baseUrl + '/EventUnits/destroyAll/' + eventUnitID, this.getOptionOne());
  }

  deleteAllEventGroups(eventUnitID): any {
    return this.http.delete(this.baseUrl + '/EventGroup/destroyAll/' + eventUnitID, this.getOptionOne());
  }
}

