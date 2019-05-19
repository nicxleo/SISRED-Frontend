import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AutenticacionService } from "../../autenticacion/autenticacion.service";
import { ComentarioHijoPdfModel } from "../../comentario/comentario-pdf-hijo.model";
import { ComentarioPdfModel } from "../../comentario/comentario-pdf.model";
import { PdfSinComentario } from "../../comentario/sin-comentario-pdf.model";

@Injectable()
export class ComentarRestClientService {
  API_URL = environment.apiUrl + "comentario-pdf/";
  COMENTARIO_PDF_GET_URL = environment.apiUrl + "comentario-pdf/{id_v}/";
  COMENTARIO_PDF_PUT_URL = environment.apiUrl + "comentario-cierre/base/{id_v}";
  COMENTARIO_PDF_POST_URL = environment.apiUrl + "comentario-cierre/";
  private comentarios: Array<ComentarioPdfModel> = [];

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private autenticacionService: AutenticacionService
  ) {}

  getComentariosByIdRed(idRed: string): Observable<ComentarioPdfModel[]> {
    let datas;
    let comentariosPdf: ComentarioPdfModel[] = [];
    this.httpClient.get(this.API_URL + idRed).subscribe((response: any) => {
      console.log(response);
      if (Array.isArray(response)) {
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
            esCierre: data.esCierre,
            cerrado: data.cerrado,
            resuelto: data.resuelto,
            UsuarioComentario: data.UsuarioComentario
          });
        });
      } else {
        let comentario: PdfSinComentario;
        comentario = response;
        comentariosPdf.push({
          id: comentario.id,
          contenido: "",
          coordenadas: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0,
            id: 0
          },
          fechaCreacion: comentario.fecha_creacion,
          version: "",
          idUsuario: "",
          width: "",
          height: "",
          rutaArchivo: comentario.archivos,
          comentariosHijos: null,
          cerrado: false,
          resuelto: false,
          esCierre: false,
          UsuarioComentario: comentario.creado_por
        });
      }
    });
    return of(comentariosPdf);
  }

  postComentariosByIdRed(comentario: any, idRed: number): Observable<any> {
    console.log("console.log.postComentariosByIdRed");
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
        esCierre: data.esCierre,
        UsuarioComentario: data.UsuarioComentario
      });
    });

    return comentariosHijosPdfModel;
  }
  ComentarioPDF_put(coment: ComentarioPdfModel): Observable<any> {
    debugger;
    const url = this.COMENTARIO_PDF_PUT_URL.replace(
      "{id_v}",
      coment.coordenadas.id.toString()
    );
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + tokenSisred
    });
    return this.http.put(url, coment).pipe(map(reponse => reponse));
  }
  ComentarioPDF_post(
    coment: ComentarioPdfModel,
    ComentarioCierre: string
  ): Observable<any> {
    const url = this.COMENTARIO_PDF_POST_URL;
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + tokenSisred
    });
    var RequestRes = {
      contenido: ComentarioCierre,
      version: coment.version,
      comentario_multimedia: coment.coordenadas.id,
      esCierre: true
    };
    return this.http.post(url, RequestRes).pipe(map(reponse => reponse));
  }
}
