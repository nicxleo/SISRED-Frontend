import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AutenticacionService} from '../../autenticacion/autenticacion.service';
import {AsignadosRED, Avance, FaseRED} from './avance.model';

@Injectable({
  providedIn: 'root'
})
export class VerAvanceConectateService {

  constructor(private http: HttpClient, private autenticacionService: AutenticacionService) {
  }

  getAvance(id: number): Promise<Avance> {
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    const urlVersion = environment.apiUrl + 'proyectoConectate/{id}/verAvance';
    const apiUrl = urlVersion.replace('{id}', id.toString());
    return new Promise((resolve, reject) => {
      this.http.get<any>(apiUrl, {headers}).subscribe(dataItem => {
        const vObject: Avance = new Avance();
        vObject.totalReds = dataItem.redsCount;
        vObject.totalRedsAlerta = dataItem.alertaRedsCount;
        vObject.totalRedsNormal = dataItem.normalRedsCount;
        vObject.totalRedsCerrado = dataItem.cerradosRedsCount;
        vObject.lstRedsAlerta = [];
        vObject.lstRedsNormal = [];
        vObject.lstRedsCerrado = [];
        dataItem.alertaReds.forEach(item => {
          const vList = new FaseRED();
          vList.idRed = item.idRed;
          vList.nombre = item.nombre;
          vList.nombreCorto = item.nombre_corto;
          vList.fechaInicio = item.fecha_inicio;
          vList.fase = item.fase;
          vList.inicioFase = item.inicio_fase;
          vList.ultimaModificacion = item.ultima_modificacion;
          vObject.lstRedsAlerta.push(vList);
        });
        dataItem.normalReds.forEach(item => {
          const vList = new FaseRED();
          vList.idRed = item.idRed;
          vList.nombre = item.nombre;
          vList.nombreCorto = item.nombre_corto;
          vList.fechaInicio = item.fecha_inicio;
          vList.fase = item.fase;
          vList.inicioFase = item.inicio_fase;
          vList.ultimaModificacion = item.ultima_modificacion;
          vObject.lstRedsNormal.push(vList);
        });
        dataItem.cerradosReds.forEach(item => {
          const vList = new FaseRED();
          vList.idRed = item.idRed;
          vList.nombre = item.nombre;
          vList.nombreCorto = item.nombre_corto;
          vList.fechaInicio = item.fecha_inicio;
          this.getAsigandos(vList.idRed)
            .then(pAsigandos => {
              vList.lstAsignados = pAsigandos;
            });
          vObject.lstRedsCerrado.push(vList);
        });
        resolve(vObject);
      }, err => {
        reject(err);
      });
    });
  }

  getAsigandos(id: number): Promise<Array<AsignadosRED>> {
    const tokenSisred = this.autenticacionService.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ' + tokenSisred
    });
    const urlVersion = environment.apiUrl + 'red/{id}/historicoAsignados';
    const apiUrl = urlVersion.replace('{id}', id.toString());
    return new Promise((resolve, reject) => {
      this.http.get<any>(apiUrl, {headers}).subscribe(dataItem => {
        const vObject: Array<AsignadosRED> = [];
        dataItem.forEach(item => {
          const vList = new AsignadosRED();
          vList.nombreCompleto = item;
          vObject.push(vList);
        });
        resolve(vObject);
      }, err => {
        reject(err);
      });
    });
  }
}
