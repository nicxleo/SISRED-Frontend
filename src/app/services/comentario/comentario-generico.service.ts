import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import { ComentarioGenerico } from './comentarioGenerico.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioGenericoService {

  NUEVO_COMENTARIO_URL = environment.apiUrl + 'post_comment/';
  OBTENER_COMENTARIOS_URL = environment.apiUrl + 'get_comentarios/{id_r}';

  private comentarios: Array<ComentarioGenerico> = [];
  
  constructor(
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) { }

  //Método que invoca el servicio con el cual se crea un nuevo comentario
  agregarComentario(contenido: String, recurso_id: String, usuario_id: String, version_id: String): Observable<any> {
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    var obj = { contenido: contenido, recurso_id: recurso_id, usuario_id: usuario_id, version_id: version_id};

    this.httpClient.post(this.NUEVO_COMENTARIO_URL, JSON.stringify(obj), {headers}).subscribe((data: Response) => {
      if (data[0].fields.nombre == contenido) {
        console.log(data[0].fields.nombre);        
      } else {
        console.log(data[0].fields.nombre);
      }
    });
    return of(obj);
  }

  // Metodo que invoca al servicio que obtiene los comentarios de un recurso
  obtenerComentarios(idRecurso: number): ComentarioGenerico[] {
    this.comentarios = [];
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    this.httpClient.get(this.OBTENER_COMENTARIOS_URL.replace('{id_r}', idRecurso.toString()), {headers}).subscribe((data: Array<any>) => {      
      data.forEach(dataItem => {
        const comentario = new ComentarioGenerico();
        comentario.id = dataItem.id;
        comentario.contenido = dataItem.contenido;
        comentario.recurso = dataItem.recurso;
        comentario.usuario = dataItem.usuario;
        comentario.version = dataItem.version;
        comentario.fecha = dataItem.fecha;
        this.comentarios.push(comentario);
      });
    });	
    return this.comentarios;
  }
}
