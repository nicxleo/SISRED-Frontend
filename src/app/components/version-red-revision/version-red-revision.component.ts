import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Recurso } from 'src/app/services/version/recurso.model';
import { VersionRedRevisionService } from 'src/app/services/version/version-red-revision.service';
import { Version } from 'src/app/services/version/version.model';
import { ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";

declare function setup(): any;
declare function setupTable(): any;

/**
 * Componente encargado de la revisión de una versión de RED.
 */
@Component({
  selector: 'app-version-red-revision',
  templateUrl: './version-red-revision.component.html',
  styleUrls: ['./version-red-revision.component.css']
})

export class VersionRedRevisionComponent implements OnInit  {
  idVersion: number;
  version: Version;
  recursos: Array<Recurso> = [];

  //Según BD
  tipoVideo: string = "video";
  tipoImagen: string = "imagen";
  tipoPDF: string = "pdf";
  
  constructor(
    private route: ActivatedRoute,    
    private versionService: VersionRedRevisionService,
    private location: Location
  ) { }

  ngOnInit() {
    this.recursos.length = 0;
    setup();    
    this.idVersion = this.route.snapshot.params.version;
    this.getVersion();
    this.getRecursos();
  }

  // Método que obtiene información de la versión (nombre, número de versión, número de recursos)
  getVersion(): void {
    this.versionService.getVersionInfo(this.idVersion).subscribe(version => (this.version = version));
    setup();
  }
  
  // Método que obtiene el listado de recursos de la versión
  getRecursos(): void {
    this.versionService.getRecursos(this.idVersion).subscribe(recursos => (this.recursos = recursos), error=>console.log("error: "+error), ()=>setTimeout(function() { setupTable() }, 1000));
  }

  // Metodo que regresa a la pantella anterior
  goBack(): void {
    this.location.back();
    console.log(this.location);
  }
}
