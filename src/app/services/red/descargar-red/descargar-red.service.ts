import { Injectable } from '@angular/core';
import {ProyectoRed} from '../../proyectoRed/proyecto-red.model';
import { Dropbox } from 'dropbox';
import {Recurso} from '../../recurso/recurso.model';

@Injectable({
  providedIn: 'root'
})
export class DescargarRedService {
  ACCESS_TOKEN = 'FOsYIGqxyoAAAAAAAAAACo5sRYD5XCAOZy15c341h99QLcgRWBeiWQfRgnCOt0Gq';
  dbx = new Dropbox({ accessToken: this.ACCESS_TOKEN, fetch });

  constructor() { }

  descargarProyectoRED(proyectoRed: ProyectoRed): Promise<any> {
    return this.dbx.filesDownloadZip({path: proyectoRed.carpeta});
  }

  descargarRecurso(recurso: Recurso): Promise<any>{
    return this.dbx.filesDownload({path: recurso.archivo});
  }

  descargarRecursosTodo(recursos: Recurso[]): Promise<any> {
    const fullpath = recursos[0].archivo;
    const pathRecursos = fullpath.substring(0, fullpath.lastIndexOf('/'));
    return this.dbx.filesDownloadZip({path: pathRecursos});
  }
}
