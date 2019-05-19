import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Version } from './version.model'
import { Recurso } from './recurso.model'
import { AutenticacionService } from '../autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class VersionRedRevisionService {
  API_URL_VERSION = environment.apiUrl +  'get_version/';
  API_URL_RECURSOS = environment.apiUrl +  'get_recursos_by_version/';
  private version: Version = new Version();
  private recursos: Array<Recurso> = [];

  constructor(private httpClient: HttpClient, private autenticacionService: AutenticacionService) { 
    
  }

  getVersionInfo(id: number): Observable<Version> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    
    this.httpClient.get(this.API_URL_VERSION, {params}).subscribe((data: any) => {
      this.version.nombreRed = data[0]['fields']['nombre'];            
      this.version.numero = data[1]['fields']['numero'];
      this.version.recursos = data[1]['fields']['recursos'].length;
      
    });

    return of(this.version)
  }

  getRecursos(id: number): Observable<Recurso[]> {
    let params = new HttpParams();
    params = params.append('id', id.toString());

    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    this.recursos = [];
    this.httpClient.get(this.API_URL_RECURSOS, { headers, params }).subscribe((data: Array<any>) => {
      data.forEach(dataItem => {
        const recurso = new Recurso();
        recurso.id = dataItem['pk'];
        recurso.nombre = dataItem['fields'].nombre;
        recurso.thumbnail = dataItem['fields'].thumbnail;
        recurso.tipo = dataItem['fields'].tipo;

        this.recursos.push(recurso);
        console.log(recurso.nombre)
        console.log(recurso.thumbnail)
      });      
    });

    return of(this.recursos)
  }
}
