import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AddCommentsService {
  API_URL = environment.apiUrl +  'post_comment/';

 constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  //Método que invoca el servicio con el cual se crea un nuevo comentario

  addComments(contenido: String, recurso_id: String, usuario_id: String, version_id: String): Observable<any> {
    var obj = { contenido: contenido, recurso_id: recurso_id, usuario_id: usuario_id, version_id: version_id};
    this.httpClient.post(this.API_URL, JSON.stringify(obj)).subscribe((data: Response) => {
      if (data[0].fields.nombre == contenido) {
        console.log(data[0].fields.nombre);
        this.router.navigate(['/']);
      } else {
        console.log(data[0].fields.nombre);
      }
    });
    //this.router.navigate(['/']);
    return of(obj);
  }
}
