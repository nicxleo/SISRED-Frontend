import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from  '@angular/common/http';

import { RolAsignado } from './rolAsignado';
import { ASIGNACIONES } from './mock-asignaciones';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  API_URL = 'localhost:8000';
  private asignaciones: Array<RolAsignado> = [];

  constructor(private httpClient: HttpClient) { }

  getAsignaciones(): Observable<RolAsignado[]> {
    /*this.httpClient.get(`${this.API_URL}/asignaciones`).subscribe((data:  Array<any>) => {
      data.forEach( dataItem => {
        let asignacion1 = new RolAsignado();
        //hacer todo.
        this.asignaciones.push(asignacion1)
      });
    });*/
    this.asignaciones = ASIGNACIONES;
    return of(this.asignaciones);
  }
}
