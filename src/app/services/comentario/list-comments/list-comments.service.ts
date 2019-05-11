import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../../../environments/environment';
import {ListComments} from './../list-comments/list-comments.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ListCommentsService {
  API_URL = environment.apiUrl + 'get_comentarios/';
  private listComments: Array<ListComments> = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  // Metodo que invoca al servicio que obtiene los comentarios de un recurso
  getListComments(idRecurso: number): Observable<ListComments[]> {

    this.listComments = [];
    this.httpClient.get(this.API_URL+idRecurso ,httpOptions).subscribe((data: Array<any>) => {
      console.log(data);
      data.forEach(dataItem => {
        const comm = new ListComments();
        comm.contenido = dataItem.contenido;
        comm.recurso_id = dataItem.recurso;
        comm.usuario_id = dataItem.usuario;
        comm.version_id = dataItem.version;
        console.log('vvvvvvvvvvvvvvvvvv');
	      console.log(comm);
        console.log('lllllllllllllllllllllll');
        this.listComments.push(comm);
      });
    });
	console.log('El servicio está retornando la siguiente lista de comentarios');
 	console.log(this.listComments);
    return of(this.listComments);
  }
}
