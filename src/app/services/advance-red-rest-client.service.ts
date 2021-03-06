import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UrlConstant } from '../constants/url-constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutenticacionService } from './autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AdvanceRedRestClientService {
  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  getAdvanceRedById(id: number): Observable<any> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });

    return this.http
      .get(environment.apiUrl + UrlConstant.ADVANCE_RED_ENDPOINT + id, {
        headers
      })
      .pipe(map(reponse => reponse));
  }
}
