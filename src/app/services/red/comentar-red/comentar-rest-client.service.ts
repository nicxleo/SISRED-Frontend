import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ComentarioHijoPdfModel } from "../../comentario/comentario-pdf-hijo.model";
import { ComentarioPdfModel } from "../../comentario/comentario-pdf.model";

@Injectable()
export class ComentarRestClientService {
  API_URL = environment.apiUrl + "comentario-pdf/";

  constructor(private httpClient: HttpClient) {}

  getComentariosByIdRed(idRed: string): Observable<ComentarioPdfModel[]> {
    let datas;
    let comentariosPdf: ComentarioPdfModel[] = [];
    this.httpClient.get(this.API_URL + idRed).subscribe((response: any) => {
      response.forEach(data => {
        comentariosPdf.push({
          id: data.id,
          contenido: data.contenido,
          coordenadas: data.comentarioMultimedia,
          fechaCreacion: data.fecha_creacion,
          version: data.version,
          idUsuario: data.usuario,
          width: data.Width,
          height: data.Height,
          rutaArchivo: data.VersionArchivo,
          comentariosHijos: this.getComentariosHijos(data.comentariosHijos),
          cerrado: data.cerrado,
          resuelto: data.resuelto
        });
      });
    });
    return of(comentariosPdf);
  }

  postComentariosByIdRed(comentario: any, idRed: number): Observable<any> {
    console.log("console.log.postComentariosByIdRed")
    let request = {
      contenido: comentario.comentario,
      version: Number(idRed),
      comentario_multimedia: null,
      x1: comentario.coordenadas.x1,
      y1: comentario.coordenadas.y1,
      x2: comentario.coordenadas.x2,
      y2: comentario.coordenadas.y2
    };
    return this.httpClient
      .post(this.API_URL, request)
      .pipe(map(reponse => reponse));
  }

  postComentarioHijoByIdRed(comentario: any, idRed: string): Observable<any> {
    let request = {
      contenido: comentario.comentario,
      version: Number(idRed),
      comentario_multimedia: Number(comentario.idComentarioPadre)
    };
    return this.httpClient
      .post(this.API_URL, request)
      .pipe(map(reponse => reponse));
  }

  private getComentariosHijos(comentariosHijos: any): ComentarioHijoPdfModel[] {
    let comentariosHijosPdfModel: ComentarioHijoPdfModel[] = [];
    comentariosHijos.forEach(data => {
      comentariosHijosPdfModel.push({
        id: data.id,
        contenido: data.contenido,
        text: "",
        fechaCreacion: data.fecha_creacion,
        version: data.version,
        idUsuario: data.usuario,
        esCierre: data.esCierre
      });
    });

    return comentariosHijosPdfModel;
  }
}
