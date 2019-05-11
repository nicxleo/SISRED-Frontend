import { Component, OnInit } from '@angular/core';
import {DetalleRedService} from '../../services/red/detalle-red/detalle-red.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recurso} from '../../services/recurso/recurso.model';
import {DetalleRed} from '../../services/red/detalle-red/detalle-red.model';
import {RecursoService} from '../../services/recurso/recurso.service';
import {ProyectoRed} from '../../services/proyectoRed/proyecto-red.model';
import {ProyectosRedService} from '../../services/proyectoRed/proyectos-red/proyectos-red.service';
import {DescargarRedService} from '../../services/red/descargar-red/descargar-red.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {Location} from "@angular/common";

@Component({
  selector: 'app-red-descargar-red',
  templateUrl: './red-descargar-red.component.html',
  styleUrls: ['./red-descargar-red.component.css']
})
export class RedDescargarRedComponent implements OnInit {
  idRed: number;
  detalle: DetalleRed;
  proyectos: ProyectoRed[];
  recursosExistentes: Recurso[];

  constructor(private route: ActivatedRoute, private detalleRedService: DetalleRedService,
              private proyectosRedService: ProyectosRedService, private recursosService: RecursoService,
              private descargarRedService: DescargarRedService, private router: Router,
              private spinner: NgxSpinnerService, private location: Location) { }

  ngOnInit() {
    this.idRed = this.route.snapshot.params.idRed;
    this.getDetalleRed();
    this.getProyectosRed();
    this.getRecursos();
  }

  // Metodo que obtiene informacion del RED
  getDetalleRed(): void {
    this.detalleRedService
      .getDetalleRed(this.idRed)
      .subscribe(detalle => (this.detalle = detalle));
  }

  // Metodo que obtiene los proyectos RED
  getProyectosRed(): void {
    this.proyectosRedService
      .getProyectosRedFull(this.idRed)
      .subscribe(proyectos => (this.proyectos = proyectos));
  }

  // Método que obtiene los recursos con la información completa del RED
  getRecursos(): void {
    this.recursosService.getRecursosFull(this.idRed)
      .then( recursos => {
        this.recursosExistentes = recursos;
      });
  }

  descargarProyectoRED(idProyectoRed: number): void {
    this.spinner.show();
    const proyecto = this.proyectos.find(x => x.id === idProyectoRed);
    this.descargarRedService.descargarProyectoRED(proyecto)
      .then(response => {
        this.prepareFileForDownload(response, 'Red_' + this.idRed + '_Proyecto_' + idProyectoRed + '.zip');
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  descargarRecursoRed(idRecurso: number): void {
    this.spinner.show();
    const recurso = this.recursosExistentes.find(x => x.id === idRecurso);
    this.descargarRedService.descargarRecurso(recurso)
      .then(response => {
        const nombreRecurso = recurso.nombre + recurso.archivo.substring(recurso.archivo.lastIndexOf('.'), recurso.archivo.length);
        this.prepareFileForDownload(response, nombreRecurso);
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  descargarRecursosTodo(): void {
    this.spinner.show();
    this.descargarRedService.descargarRecursosTodo(this.recursosExistentes)
      .then(response => {
        this.prepareFileForDownload(response, 'RecursosRed_' + this.idRed + '.zip');
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
      });
  }

  prepareFileForDownload(response: any, name: string) {
    const blob = new Blob([response.fileBlob], { type: response.fileBlob.type });
    const blobURL = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = name;
    anchor.href = blobURL;
    this.spinner.hide();
    anchor.click();
  }
  // Metodo que regresa a la pantella anterior
  goBack(): void {
    this.location.back();
    console.log(this.location);
  }

}
