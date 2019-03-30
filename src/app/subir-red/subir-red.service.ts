import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProyectoRED, Recurso, RED} from './subir-red.component';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirRedService {
  API_URL = 'https://apropiacion.herokuapp.com';
  HEADERS = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(private  httpClient: HttpClient) {
  }

  getProyectosRED(): Observable<ProyectoRED[]> {
    const vLstObjetos = [];
    const METHOD_URL = '/{Controller}/{View}/';
    this.httpClient.get(this.API_URL + METHOD_URL).subscribe((data: Array<any>) => {
      data.forEach(dataItem => {
        const vObjeto = new ProyectoRED();
        vObjeto.nombre = dataItem.nombre;
        vObjeto.carpeta = dataItem.carpeta;
        vObjeto.tipo = dataItem.tipo;
        vLstObjetos.push(vObjeto);
      });
    });
    return of(vLstObjetos);
  }

  getRecurso(): Observable<Recurso[]> {
    const vLstObjetos = [];
    const METHOD_URL = '/{Controller}/{View}/';
    this.httpClient.get(this.API_URL + METHOD_URL).subscribe((data: Array<any>) => {
      data.forEach(dataItem => {
        const vObjeto = new Recurso();
        vObjeto.nombre = dataItem.nombre;
        vObjeto.archivo = dataItem.archivo;
        vObjeto.descripcion = dataItem.descripcion;
        vObjeto.thumbnail = dataItem.thumbnail;
        vObjeto.fechaCreacion = dataItem.fecha_creacion;
        vObjeto.fechaUltimaModificacion = dataItem.fecha_ultima_modificacion;
        vObjeto.tipo = dataItem.tipo;
        vLstObjetos.push(vObjeto);
      });
    });
    return of(vLstObjetos);
  }

  getRED(): Observable<RED[]> {
    const vLstObjetos = [];
    const METHOD_URL = '/{Controller}/{View}/';
    this.httpClient.get(this.API_URL + METHOD_URL).subscribe((data: Array<any>) => {
      data.forEach(dataItem => {
        const vObjeto = new RED();
        vObjeto.codigo = dataItem.codigo;
        vObjeto.nombre = dataItem.nombre;
        vObjeto.nombreCorto = dataItem.nombre_corto;
        vObjeto.descripcion = dataItem.descripcion;
        vObjeto.fechaInicio = dataItem.fecha_inicio;
        vObjeto.fechaCierre = dataItem.fecha_cierre;
        vObjeto.fechaCreacion = dataItem.fecha_creacion;
        vObjeto.porcentajeAvance = dataItem.porcentaje_avance;
        vObjeto.tipo = dataItem.tipo;
        vObjeto.solicitante = dataItem.solicitante;
        vObjeto.horasEstimadas = dataItem.horas_estimadas;
        vObjeto.horasTrabajadas = dataItem.horas_trabajadas;
        vLstObjetos.push(vObjeto);
      });
    });
    return of(vLstObjetos);
  }

  addRED(pObject: FormData) {
    const METHOD_URL = 'url/to/your/api';
    return this.httpClient.post(this.API_URL + METHOD_URL, pObject)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      });
  }
}
