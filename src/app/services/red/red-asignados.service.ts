import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { RedAsignado } from './RedAsignado';
import { environment } from './../../../environments/environment';
import { AutenticacionService } from '../autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class RedAsignadosService {
  API_URL: string = environment.apiUrl + 'reds/asignados/';

  public reds: Array<RedAsignado> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  getREDs(idUsuario: number): Observable<RedAsignado[]> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });

    this.reds = [];
    this.httpClient
      .get(this.API_URL + idUsuario,  { headers } )
      .subscribe((data: any) => {
        console.log(data);
        data.redsAsignados.forEach(dataItem => {
          const red = new RedAsignado();
          red.id = dataItem.idRed;
          red.nombre = dataItem.nombreRed;
          red.descripcion = dataItem.descripcion;
          red.tipo = dataItem.tipo;
          red.solicitante = dataItem.solicitante;
          red.fecha_inicio = dataItem.fecha_inicio;
          red.fecha_cierre = dataItem.fecha_cierre;
          red.porcentaje = dataItem.porcentaje;
          red.horas_estimadas = dataItem.horas_estimadas;
          red.listo_revision = dataItem.listo_revision;
          red.version_numero = dataItem.version_numero;
          red.version_id = dataItem.version_id;
          console.log(red.version_id)
          this.reds.push(red);
        });
      });
    return of(this.reds);
  }
}
