import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { ProyectoRed } from './../proyecto-red.model';
import { AutenticacionService } from '../../autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosRedService {
  API_URL = environment.apiUrl + 'detallered/proyectos/';
  API_URL_FULL = environment.apiUrl + 'reds/<<idRed>>/proyectored/';
  private proyectosRed: Array<ProyectoRed> = [];

  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  // Metodo que invoca al servicio que obtiene los proyectos RED
  getProyectosRed(idRed: number): Observable<ProyectoRed[]> {
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });

    let params = new HttpParams();

    params = params.append('RED', idRed.toString());
    this.proyectosRed = [];
    this.httpClient
      .get(this.API_URL, { headers, params })
      .subscribe((data: Array<any>) => {
        data.forEach(dataItem => {
          const pro = new ProyectoRed();
          pro.id = dataItem.id;
          pro.name = dataItem.name;
          pro.autor = dataItem.autor;
          pro.typeFile = dataItem.typeFile;
          pro.createdDate = dataItem.createdDate;
          pro.description = dataItem.description;

          this.proyectosRed.push(pro);
        });
      });
    return of(this.proyectosRed);
  }

  // Método que invoca al servicio que obtiene los proyectos RED con todos sus campos
  getProyectosRedFull(idRed: number): Observable<ProyectoRed[]> {
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });

    const params = new HttpParams();

    const urlFinal = this.API_URL_FULL.replace('<<idRed>>', idRed.toString());
    this.proyectosRed = [];
    this.httpClient
      .get(urlFinal, { headers, params })
      .subscribe((data: any) => {
        console.log(data);
        data.context.forEach(dataItem => {
          const pro = new ProyectoRed();
          pro.id = dataItem.id;
          pro.name = dataItem.nombre;
          pro.autor = dataItem.autor;
          pro.typeFile = dataItem.tipo;
          pro.createdDate = dataItem.fechaCreacion;
          pro.description = dataItem.descripcion;
          pro.carpeta = dataItem.carpeta;

          this.proyectosRed.push(pro);
        });
      });
    return of(this.proyectosRed);
  }
}
