import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comentario } from './comentario.model';
import { of } from 'rxjs/internal/observable/of';
import { Recurso } from '../version/ver-version-red/recurso.model';
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ComentarImagenService {

  COMENTARIO_EXISTENTE_URL = environment.apiUrl + 'versiones/{id_v}/recursos/{id_r}/comentarios/';
  COMENTARIO_NUEVO_URL = environment.apiUrl + 'versiones/{id_v}/recursos/{id_r}/comentariosnuevos/';
  OBTENER_LISTA_COMENTARIOS_URL = environment.apiUrl + 'versiones/{id_v}/recursos/{id_r}/listacomentarios/';
  OBTENER_DETALLES_RECURSO_URL = environment.apiUrl + 'recurso_get/{id}';

  private comentarios: Array<Comentario> = [];

  constructor(private httpClient: HttpClient) { }

  // Metodo que invoca al servicio que agrega un comentario a un comentario existente
  guardarComentarioExistente(contenido:String, usuario:number, idTabla:number, id_v:number, id_r:number){
    const url = this.COMENTARIO_EXISTENTE_URL.replace('{id_v}', id_v.toString()).replace('{id_r}', id_r.toString());
    var obj = {contenido, usuario, idTabla};
    return this.httpClient.post<Comentario>(url, JSON.stringify(obj), httpOptions);
  }

  // Metodo que invoca al servicio que agrega un comentario nuevo
  guardarComentarioNuevo(contenido:String, usuario:number, x1:number, x2:number, y1:number, y2:number, id_v:number, id_r:number){
    const url = this.COMENTARIO_NUEVO_URL.replace('{id_v}', id_v.toString()).replace('{id_r}', id_r.toString());
    var obj = {contenido, usuario, x1, x2, y1, y2};
    console.log(obj);
    return this.httpClient.post<Comentario>(url, JSON.stringify(obj), httpOptions);
  }

  // Metodo que invoca al servicio que obtiene la lista de comentarios
  obtenerListaComentarios(id_v:number, id_r:number): Promise<Comentario[]>{
    this.comentarios = [];
    const url = this.OBTENER_LISTA_COMENTARIOS_URL.replace('{id_v}', id_v.toString()).replace('{id_r}', id_r.toString());
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        data.context.forEach(dataItem => {
          const comentario = new Comentario();
          comentario.contenido = dataItem.contenido;
          comentario.fechaCreacion = dataItem.fecha_creacion;
          comentario.cerrado = dataItem.cerrado;
          comentario.comentarioMultimedia = dataItem.comentario_multimedia;
          comentario.usuario = dataItem.usuario.usuario.first_name + ' ' + dataItem.usuario.usuario.last_name;
          this.comentarios.push(comentario);
        });
        resolve(this.comentarios);
      }, err => {
        reject(err);
      }
      );
    });
  }

  // Metodo que invoca al servicio que obtiene los detalles de un recurso
  obtenerDetallesRecurso(idRecurso: number): Promise<Recurso> {  
    const url = this.OBTENER_DETALLES_RECURSO_URL.replace('{id}', idRecurso.toString());    
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe((data: any) => {
        const recurso = new Recurso();
        recurso.nombre = data.nombre;
        recurso.id = data.id;
        recurso.archivo = data.archivo;
        recurso.thumbnail = data.thumbnail;
        recurso.fechaCreacion = data.fecha_creacion;
        recurso.tipo = data.tipo;
        recurso.descripcion = data.descripcion;
        recurso.url = '';
        resolve(recurso);
      }, err => {
        reject(err);
      });      
    });
  }

  getImagenRecurso(ruta: string): Promise<any> {
    let ACCESS_TOKEN = 'FOsYIGqxyoAAAAAAAAAACo5sRYD5XCAOZy15c341h99QLcgRWBeiWQfRgnCOt0Gq';
    let dbx = new Dropbox({ accessToken: ACCESS_TOKEN, fetch });
    return dbx.filesGetTemporaryLink({path: ruta});
  }
}
