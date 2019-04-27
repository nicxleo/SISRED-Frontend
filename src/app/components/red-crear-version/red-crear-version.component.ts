import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleRed } from '../../services/red/detalle-red/detalle-red.model';
import { DetalleRedService } from '../../services/red/detalle-red/detalle-red.service';
import { CrearVersionModel, Version } from '../../services/version/version.model';
import { Recurso } from '../../services/recurso/recurso.model';
import { VersionService } from '../../services/version/version.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { RecursoService } from '../../services/recurso/recurso.service';

@Component({
  selector: 'app-red-crear-version',
  templateUrl: './red-crear-version.component.html',
  styleUrls: ['./red-crear-version.component.css']
})
export class RedCrearVersionComponent implements OnInit {
  detalle: DetalleRed;
  versionesExistentes: Version[];
  recursosExistentes: Recurso[];
  recursosSeleccionados: Recurso[];
  thumbnail: File;
  model: CrearVersionModel;
  idRed: number;
  constructor(private route: ActivatedRoute, private detalleRedService: DetalleRedService,
              private versionesService: VersionService, private recursosService: RecursoService, private location: Location) { }

  ngOnInit() {
    this.idRed = this.route.snapshot.params.idRed;
    this.getDetalleRed();
    this.getRecursos();
    this.getVersiones();
    this.recursosSeleccionados = [];
  }

  // Metodo que procesa los archivos seleccionados para guardar versión
  fileChangeEvent(fileInput: any) {
    this.thumbnail = fileInput.target.files[0] as File;
  }


  // Metodo ejecutado al darle enviar desde la vista
  onSubmit(form: NgForm) {
    this.model.redId = this.idRed;
    this.model.recursosSeleccionados = this.recursosSeleccionados;
    this.model.archivos = '/Reds/' + this.idRed + '/Versiones/' + this.model.consecutivo + '/';
    this.model.imagen = this.model.archivos + this.thumbnail.name;
    this.model.recursos = [];
    this.model.recursosSeleccionados.forEach(recurso => {
      this.model.recursos.push(recurso.id);
    });
    this.crearVersionRed(this.model);
    this.crearVersionDropbox(this.idRed, this.model.consecutivo, this.model.recursosSeleccionados, this.thumbnail);
  }

  // Método para crear versión de red. Envía información al backend.
  crearVersionRed(model: CrearVersionModel) {
    this.versionesService.crearVersionRed(model, this.idRed)
      .subscribe(status => {
        if (status) {
          this.goBack();
        }
      });
  }

  // Método que copia los archivos internamente en dropbox
  crearVersionDropbox(idRed: number, consecutivo: number, recursos: Array<Recurso>, thumbnail: File) {
    this.versionesService.crearVersionDropbox(idRed, consecutivo, recursos, thumbnail);
  }

  // Metodo que obtiene informacion del RED
  getDetalleRed(): void {
    this.detalleRedService
      .getDetalleRed(this.idRed)
      .subscribe(detalle => (this.detalle = detalle));
  }

  // Método que obtiene los recursos con la información completa del RED
  getRecursos(): void {
    this.recursosService.getRecursosFull(this.idRed)
      .then( recursos => {
        this.recursosExistentes = recursos;
      });
  }

  // Metodo que obtiene las versiones del RED
  getVersiones(): void {
    this.versionesService.getVersiones(this.idRed)
      .then(versiones => {
        this.versionesExistentes = versiones;
        this.populateModel();
      });
  }
  // Metodo que llena la información necesaria para el modelo de la vista
  populateModel(): void {
    this.model = new CrearVersionModel();
    this.model.consecutivo = this.versionesExistentes.length + 1;
    this.model.nombre =  this.detalle.nameRed + ' ' + this.model.consecutivo;
    this.model.fechaCreacion = new Date().toLocaleString();
    this.model.creado_por = 'jmendez';
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

  // Metodo que regresa a la pantella anterior
  goBack(): void {
    this.location.back();
  }

}
