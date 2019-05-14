import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { AutenticacionService } from '../autenticacion/autenticacion.service';
import {DatosUsuario} from "../../models/datos-usuario";

@Injectable({
  providedIn: 'root'
})


export class CommentsVersionVideoService {

  API_URL = environment.apiUrl + 'comentarios/video/';

  annotations: any[];
  recursoVideo: any[];
  constructor(private httpClient: HttpClient, private autenticacionService: AutenticacionService) { 
    
  }

  
  // Metodo que invoca al servicio que obitiene los comentarios del video
  getCommentsVersionVideo(idRecurso: number): Observable<Array<any>> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    
    this.annotations = [];
    this.httpClient.get(this.API_URL + idRecurso, { headers }).subscribe((data: any) => {
      for (const entry of data) {
          this.annotations.push(entry);
      }
    });
    return of(this.annotations);
  }

  // Metodo que invoca al servicio que obitiene los comentarios del video
  addVideoComments(idVersion: number, idRecurso: number, commentsDetail: object) {
    const tokenSisred = this.autenticacionService.obtenerToken();

    this.httpClient.post(this.API_URL + idVersion + '/' + idRecurso,  commentsDetail).subscribe((data: any) => {

    });
  }

  // Metodo que invoca al servicio que obitiene la url del recurso video
  getUrlRecursoVideo(idRecurso: number): Observable<Array<any>> {
    const tokenSisred = this.autenticacionService.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });

    this.recursoVideo = [];
    this.httpClient.get(this.API_URL + 'url/' + idRecurso, { headers }).subscribe((data: any) => {
      for (const dataItem of data) {
          this.recursoVideo.push(dataItem);
      }
    });
    return of(this.recursoVideo);
  }

  // Metodo que invoca al servicio que cierra comentario
  cerrarComentarioVideo(idRecurso: any, idComentarioMultimedia: any, comentarioCierre: string) {
    const userData: DatosUsuario = this.autenticacionService.obtenerDatosUsuario();
    const body = {'id_recurso':idRecurso, 'id_multimedia':idComentarioMultimedia, 'id_usuario':userData.idConectate, 'contenido':comentarioCierre};
    this.httpClient.post(this.API_URL + '/cierre', body).subscribe((data: any) => {

    });
  }

}
