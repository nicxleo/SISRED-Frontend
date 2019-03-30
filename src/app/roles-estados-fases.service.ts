import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from  '@angular/common/http';

import { ROLES } from './roles';
import { ESTADOS } from './estados';
import { FASES } from './fases';

@Injectable({
  providedIn: 'root'
})
export class RolesEstadosFasesService {

  API_URL = 'localhost:8000';
  private roles: string[] = [];
  private estados: string[] = [];
  private fases: string[] = [];

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<string[]> {
    /*this.httpClient.get(`${this.API_URL}/roles`).subscribe((data:  Array<any>) => {
      data.forEach(item => this.roles.push(item.nombre));
    });*/
    this.roles = ROLES;
    return of(this.roles);
  }

  getEstados(): Observable<string[]> {
    /*this.httpClient.get(`${this.API_URL}/estados`).subscribe((data:  Array<any>) => {
      data.forEach(item => this.estados.push(item.nombre_estado));
    });*/
    this.estados = ESTADOS;
    return of(this.estados);
  }

  getFases(): Observable<string[]> {
    /*this.httpClient.get(`${this.API_URL}/fases`).subscribe((data:  Array<any>) => {
      data.forEach(item => this.fases.push(item.nombre_fase));
    });*/
    this.fases = FASES;
    return of(this.fases);
  }
}
