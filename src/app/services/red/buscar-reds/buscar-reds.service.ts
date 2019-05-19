import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { AutenticacionService } from '../../autenticacion/autenticacion.service';

import { Red } from '../red';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarRedsService {

  constructor(private httpClient: HttpClient, private autenticacionService: AutenticacionService) { }

  buscarReds(fechaInicio, fechaCierre, texto): Promise<Red[]> {

    let params = new HttpParams();

    params = fechaInicio===null ? params : params.append('fstart', fechaInicio)
    params = fechaCierre===null ? params : params.append('fend', fechaCierre)
    params = texto===null ? params : params.append('text', texto)

    const tokenSisred = this.autenticacionService.obtenerToken();
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: tokenSisred
      }),
      params,
    };

    return new Promise((resolve, reject) => {
      this.httpClient.get(`${environment.apiUrl}buscarReds/`, options).subscribe((data: Array<any>) => {
        let reds = [];
        data.forEach(item => {
          let red = new Red();
          red.id = item.id;
          red.nombre = item.nombre;
          red.descripcion = item.descripcion;
          red.fechaInicio = item.fecha_inicio;
          red.fechaCierre = item.fecha_cierre;
          red.tipo = item.tipo;
          red.asignado = item.asignado;
          reds.push(red);
        });
        resolve(reds);
      }, err => {
        reject(err);
      });
    });
  }
}
