import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConcienciaInfo} from 'src/app/models/Conciencia-info/conciencia-info/conciencia-info';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConcienciaServiceService {
  private ConcienciaInfo = new BehaviorSubject<ConcienciaInfo[]>(null);

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNandamojoInfo(IdLanguaje: number) : any{
    return this.http.get(this.baseUrl + '/CompanyInfo/getGWDInfo/' + IdLanguaje);
  }
}
