import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { ComentarioGenericoService } from 'src/app/services/comentario/comentario-generico.service'
import { ComentarioGenerico } from 'src/app/services/comentario/comentarioGenerico.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';

declare function setup(): any;

@Component({
  selector: 'app-comentarios-version-generico',
  templateUrl: './comentarios-version-generico.component.html',
  styleUrls: ['./comentarios-version-generico.component.css']
})
export class ComentariosVersionGenericoComponent implements OnInit {

  public Editor = ClassicEditor;
  
  public addCommentsForm: FormGroup;
  comentarios: ComentarioGenerico[] = null;
  idRecurso: number;
  idVersion: number;
  idUsuario: String;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private comentarioGenericoService: ComentarioGenericoService,
              private location: Location,
              private autenticacion: AutenticacionService)
  {}

  ngOnInit() {    
    this.idRecurso = this.activatedRoute.snapshot.params.idRecurso;
    this.idVersion = this.activatedRoute.snapshot.params.idVersion;    
    this.comentarios = this.comentarioGenericoService.obtenerComentarios(this.idRecurso)
    this.idUsuario = this.autenticacion.obtenerDatosUsuario().idConectate
    this.addCommentsForm = new FormGroup({
      contenido: new FormControl()
   });
  }

  agregarComentario(){
    var result =
    this.comentarioGenericoService.agregarComentario(
      this.addCommentsForm.get('contenido').value,
      this.idRecurso.toString(),      
      this.idUsuario,
      this.idVersion.toString());
    this.comentarios = this.comentarioGenericoService.obtenerComentarios(this.idRecurso)
  }

  goBack(): void {
    this.location.back()
  }

}