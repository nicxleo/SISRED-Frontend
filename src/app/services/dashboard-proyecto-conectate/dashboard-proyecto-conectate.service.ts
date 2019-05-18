import { Injectable } from '@angular/core';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardProyectoConectateService {
  constructor(
    private http: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  // Realiza la petición para obtener los proyectos
  obtenerMetricasProyectosConectate() {
    return new Promise((resolve, reject) => {
      const tokenSisred = this.autenticacionService.obtenerToken();

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + tokenSisred
      });

      this.http.get(environment.apiUrl + 'getMetrics/', { headers }).subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject('Error');
        }
      );
    });
  }
}
