import { Component, OnInit } from '@angular/core';
import {DetalleRedService} from '../../services/red/detalle-red/detalle-red.service';
import {ActivatedRoute} from '@angular/router';
import {Recurso} from '../../services/recurso/recurso.model';
import {DetalleRed} from '../../services/red/detalle-red/detalle-red.model';
import {RecursoService} from '../../services/recurso/recurso.service';
import {ProyectoRed} from '../../services/proyectoRed/proyecto-red.model';
import {ProyectosRedService} from '../../services/proyectoRed/proyectos-red/proyectos-red.service';

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
  recursosSeleccionados: Recurso[];

  constructor(private route: ActivatedRoute, private detalleRedService: DetalleRedService,
              private proyectosRedService: ProyectosRedService, private recursosService: RecursoService) { }

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
      .getProyectosRed(this.idRed)
      .subscribe(proyectos => (this.proyectos = proyectos));
  }

  // Método que obtiene los recursos con la información completa del RED
  getRecursos(): void {
    this.recursosService.getRecursosFull(this.idRed)
      .then( recursos => {
        this.recursosExistentes = recursos;
      });
  }

  // Método para guardar la información de los recursos seleccionados
  onSelectRecurso(nombre: string): void {
    const seleccionado = document.getElementById('checkbox_' + nombre) as HTMLInputElement;
    const isChecked = seleccionado.checked;
    const index = this.recursosSeleccionados.findIndex(r => r.nombre === nombre);
    if (isChecked && index === -1) {
      const sel = this.recursosExistentes.find(r => r.nombre === nombre);
      this.recursosSeleccionados.push(sel);
    }
    if (!isChecked && index >= 0) {
      this.recursosSeleccionados.splice(index, 1);
    }
  }

  descargarProyectoRED(idProyectoRed: number): void {
    alert(idProyectoRed);
    //TODO
  }

  descargarRecursosSeleccionados(): void {
    //TODO
  }

  descargarRecursosTodo(): void {
    //TODO
  }

}
