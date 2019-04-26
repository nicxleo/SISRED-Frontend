import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Recurso } from './recurso.model';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  API_URL_GETFULL = environment.apiUrl + 'red/{id}/recursos/';
  httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
  private recursos: Array<Recurso> = [];

  constructor(private http: HttpClient) {}

  getRecursos(id): Observable<any> {
    return this.http.get(environment.apiUrl + 'getRecurso/' + id, {
      headers: this.httpHeaders
    });
  }

  getRecursosFull(idRed: number): Promise<Recurso[]> {
    this.recursos = [];
    const apiUrlFinal = this.API_URL_GETFULL.replace('{id}', idRed.toString());
    return new Promise((resolve, reject) => {
      this.http.get(apiUrlFinal).subscribe((data: any) => {
        data.context.forEach(dataItem => {
          const recurso = new Recurso();
          recurso.id = dataItem.id;
          recurso.nombre = dataItem.nombre;
          recurso.archivo = dataItem.archivo;
          recurso.thumbnail = dataItem.thumbnail;
          recurso.fechaCreacion = dataItem.fecha_creacion;
          recurso.fechaUltimaModificacion = dataItem.fecha_ultima_modificacion;
          recurso.tipo = dataItem.tipo;
          recurso.descripcion = dataItem.descripcion;
          // recurso.metadata =
          recurso.autor = dataItem.autor;
          recurso.usuarioUltimaModificacion = dataItem.usuario_ultima_modificacion;
          this.recursos.push(recurso);
        });
        resolve(this.recursos);
      });
    });
  }
}
