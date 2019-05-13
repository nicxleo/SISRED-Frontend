import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ComentarioHijoPdfModel } from '../../comentario/comentario-pdf-hijo.model';
import { ComentarioPdfModel } from '../../comentario/comentario-pdf.model';

@Injectable()
export class ComentarRestClientService {
	API_URL = environment.apiUrl + 'comentario-pdf/';

	constructor(private httpClient: HttpClient) {}

	getComentariosByIdRed(idRed: string): Observable<ComentarioPdfModel[]> {
		let datas;
    let comentariosPdf: ComentarioPdfModel[] =[];
		this.httpClient.get(this.API_URL + idRed).subscribe((response: any) => {
			response.forEach((data) => {
				comentariosPdf.push( 
					{
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
					}
				);
			});
		});
		return of(comentariosPdf);
	}

	postComentariosByIdRed(comentario: any): Observable<any> {
		return this.httpClient.post(this.API_URL, comentario).pipe(map((reponse) => reponse));
  }
  
  private getComentariosHijos(comentariosHijos:any): ComentarioHijoPdfModel[]{
    let comentariosHijosPdfModel: ComentarioHijoPdfModel[]= [];
    comentariosHijos.forEach(data => {
      comentariosHijosPdfModel.push({
        id: data.id,
        contenido: data.contenido,
        fechaCreacion: data.fecha_creacion,
        version: data.version,
        idUsuario: data.usuario,
        esCierre: data.esCierre,
      })
    });
      

    return comentariosHijosPdfModel;

  }
}
