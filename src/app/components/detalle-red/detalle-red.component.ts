import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonasAsignadasService } from '../../services/rolAsignado/personas-asignadas/personas-asignadas.service';
import {RecursosAsociadosService} from '../../services/recurso/recursos-asociados/recursos-asociados.service';
import {ProyectosRedService} from '../../services/proyectoRed/proyectos-red/proyectos-red.service';
import {PersonaAsignada} from '../../services/rolAsignado/personas-asignadas/persona-asignada.model';
import {DetalleRed} from '../../services/red/detalle-red/detalle-red.model';
import {ProyectoRed} from '../../services/proyectoRed/proyecto-red.model';
import {RecursoAsociado} from '../../services/recurso/recursos-asociados/recurso-asociado.model';
import {Metadata} from '../../services/metadata/metadata.model';
import {Version} from '../../services/version/version.model';
import {MetadataService} from '../../services/metadata/metadata.service';
import {DetalleRedService} from '../../services/red/detalle-red/detalle-red.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {VersionService} from '../../services/version/version.service';
import { FaseService } from '../../services/fase/fase.service';
import { Fase } from '../../services/fase/fase.model';

declare let $: any;

declare function setup(): any;

/**
 * Componente encargado del Detalle de un RED en especifico.
 */
@Component({
  selector: 'app-detalle-red',
  templateUrl: './detalle-red.component.html',
  styleUrls: ['./detalle-red.component.css']
})
export class DetalleREDComponent implements OnInit {
  detalle: DetalleRed;
  personas: PersonaAsignada[];
  recursos: RecursoAsociado[];
  proyectos: ProyectoRed[];
  metadata: Metadata[];
  versiones: Version[];
  idRed: number;
  fases: Fase[];
  body: string;
  mensajeAdvertencia: string;
  mensaje: string;
  heading: string;
  cambioFaseExitoso: boolean;
  comentario: string;

  @ViewChild('modalFase') modal: ElementRef;
  @ViewChild('modalFaseRespuesta') modalRespuesta: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private detalleRedService: DetalleRedService,
    private personaAsignadaService: PersonasAsignadasService,
    private recursosAsociadosService: RecursosAsociadosService,
    private proyectosRedService: ProyectosRedService,
    private metadataService: MetadataService,
    private versionesService: VersionService,
    private location: Location,
    private faseService: FaseService,
  ) {}

  ngOnInit() {
    setup();
    this.idRed = this.route.snapshot.params.idRed;
    this.getDetalleRed();
    this.getPersonasAsignadas();
    this.getRecursosAsociados();
    this.getProyectosRed();
    this.getMetadata();
    this.getVersiones();
    this.getFases();
  }

  // Metodo que obtiene informacion del RED
  getDetalleRed(): void {
    this.detalleRedService
      .getDetalleRed(this.idRed)
      .subscribe(detalle => (this.detalle = detalle));
  }

  // Metodo que obtiene personas asignadas al RED
  getPersonasAsignadas(): void {
    this.personaAsignadaService
      .getPersonasAsignadas(this.idRed)
      .subscribe(personas => (this.personas = personas));
  }

  // Metodo que obtiene los recursos asociados al RED
  getRecursosAsociados(): void {
    this.recursosAsociadosService
      .getRecursosAsociados(this.idRed)
      .subscribe(recursos => (this.recursos = recursos));
  }

  // Metodo que obtiene los proyectos RED
  getProyectosRed(): void {
    this.proyectosRedService
      .getProyectosRed(this.idRed)
      .subscribe(proyectos => (this.proyectos = proyectos));
  }

  // Metodo que obtiene la metadata del RED
  getMetadata(): void {
    this.metadataService
      .getMetadata(this.idRed)
      .subscribe(metadata => (this.metadata = metadata));
  }

  // Metodo que obtiene las versiones del RED
  getVersiones(): void {
    this.versionesService.getVersiones(this.idRed)
      .then(versiones => {
        this.versiones = versiones;
        this.getImagenesVersiones();
      });
  }

  getImagenesVersiones(): void {
    console.log(this.versiones);
    this.versiones.forEach(version => {
      this.versionesService.getImagenVersion(version.imagen)
        .then(response => {
          version.url = response.link;
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  // Metodo que regresa a la pantella anterior
  goBack(): void {
    this.location.back();
    console.log(this.location);
  }

  // Marcar versión como final
  markAsFinal(version:Version): void {
    this.versionesService.markAsFinal(version.id).subscribe(()=>this.getVersiones())
  }

  // Metodo que obtiene las fases
  getFases(): void {
    this.faseService.getFases()
      .subscribe(fases => this.fases = fases);
  }

  // Metodo para cambiar fase
  cambiarFase(): void {
    console.log('comentario', this.comentario);
    if(this.comentario != null){
      var respuesta: string;
      this.faseService.cambiarFase(this.idRed, this.detalle.fase.idConectate, this.comentario)
        .then(data => {
          this.cambioFaseExitoso = true;
          this.mensaje = 'El cambio de fase fue exitoso.';
          $(this.modalRespuesta.nativeElement).modal('show');
        }
        ).catch(error => {
          this.cambioFaseExitoso = false;
          this.mensaje = error.error;
          $(this.modalRespuesta.nativeElement).modal('show');
        });
        $(this.modalRespuesta.nativeElement).modal('hide');
      }else{
        alert('El comentario es requerido');
      }
  }

  //Metodo para cuando una fase es seleccionada
  onOptionsSelected() {
    this.heading = 'Cambiar de fase';
    this.body = '¿Desea cambiar de fase a ' + this.fases[this.detalle.fase.idConectate].nombre + '?'
    this.mensajeAdvertencia = this.seleccionarTexto(this.detalle.fase.idConectate.toString());
    $(this.modal.nativeElement).modal('show');
  }

  //Metodo para cerrar el modal
  closeModal() {
    this.mensaje = null;
    location.reload();
  }

  //Metodo para traer el mensaje del modal
  seleccionarTexto(value: string): string {
    console.log('id fase', value);
    var mensaje;
    switch (value) {
      case "0":
        mensaje = 'El RED está listo para generar los recursos asociados.';
        break;
      case "1":
        mensaje = 'Los recursos del RED estan hechos.';
        break;
      case "2":
        mensaje = 'La version ya fue revisada por Control de calidad.';
        break;
      case "3":
        mensaje = 'Debe existir una versión para revisión. ';
        break;
      case "4":
        mensaje = 'El cliente final ya dio su aprobación.';
        break;
      default:
        mensaje = '';
        break;
    }
    return mensaje;
  }

  habilitarOpcionCambiarFase(idFase): boolean{
    if(this.detalle.fase.idConectate==3 && idFase ==2){
      return false;
    }else if(idFase != (1*this.detalle.fase.idConectate+1)){
      return true;
    }
    return false;
  }

}
