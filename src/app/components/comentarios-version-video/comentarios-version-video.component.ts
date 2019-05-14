import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {AnnotationComments} from '@contently/videojs-annotation-comments';
import {CommentsVersionVideoService} from '../../services/recurso/comments-version-video.service';
import {ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {Location} from '@angular/common';
import {AutenticacionService} from '../../services/autenticacion/autenticacion.service';
import {DatosUsuario} from '../../models/datos-usuario';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

declare let $: any;
declare let videojs: any;
declare function setup(): any;

/**
 * Componente encargado de los Comentarios de una version de recurso video.
 */
@Component({
  selector: 'app-comentarios-version-video',
  templateUrl: './comentarios-version-video.component.html',
  styleUrls: ['./comentarios-version-video.component.css']
})
export class ComentariosVersionVideoComponent implements OnInit, AfterViewInit {

  public Editor = ClassicEditor;
  idVersion = 0;
  idRecurso = 1;
  pluginOptions: any;
  annotations: any[];
  playerOptions = {controlBar: {volumePanel: {inline: false}}};
  player: any;
  respuestaVideo: any;
  heading: string;
  mensaje: string;
  idComentarioCerrar: number;
  contenidoComentarioCerrar: string;
  comentarioResuelto: string;

  @ViewChild('modalComentario') modal: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsVersionVideoService: CommentsVersionVideoService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private autenticacionService: AutenticacionService
  ) {
    this.idVersion = this.activatedRoute.snapshot.params.idVersion;
    this.idRecurso = this.activatedRoute.snapshot.params.idRecurso;
  }

  ngOnInit() {
    console.log('ngOnInit Comentarios');
    setup();
    this.getUrlRecursoVideo();
  }

  ngAfterViewInit() {
    setTimeout(() => {
          this.addPluginVideo();
      },
      1000);
  }

  // Metodo que obtiene la url del recurso video
  getUrlRecursoVideo(): void {
    this.commentsVersionVideoService.getUrlRecursoVideo(this.idRecurso).subscribe(url => (this.respuestaVideo = url));
  }

  // Metodo que configura el plugin de video
  iniciarPlugin(): void {
    const plugin = this.player.annotationComments(this.pluginOptions);
    plugin.on('onStateChanged', (event) => {
      console.log('Persistiendo Comentarios->');
      console.log(event.detail);
      this.commentsVersionVideoService.addVideoComments(this.idVersion, this.idRecurso, event.detail);
      setTimeout(() => {
                this.consultarComentarios();
            }, 2500);
      this.cdRef.detectChanges();
    });
    plugin.onReady(console.log('PLUGIN IS READY!'));

  }

  // Metodo que agrega el plugin al video
  addPluginVideo(): void {
    this.consultarComentarios();

    const userData: DatosUsuario = this.autenticacionService.obtenerDatosUsuario();

    this.pluginOptions = {
      annotationsObjects: this.annotations,
      bindArrowKeys: true,
      meta: {
        user_id: userData.idConectate, // TODO es el único ID que se tiene
        user_name: userData.email
      },
      showControls: true,
      showCommentList: true,
      showFullScreen: true,
      startInAnnotationMode: false,
      showMarkerShapeAndTooltips: true
    };

    if (videojs.getPlayers()['my-video']) { // No se permiten multiples
      delete videojs.getPlayers()['my-video'];
    }
    this.player = videojs('my-video', this.playerOptions, function onPlayerReady() {
      videojs.log('Your player is ready!');

      // In this context, `this` is the player that was created by Video.js.
      // this.play();

      // muted
      this.muted(false);

    });

    setTimeout(() => {
          this.iniciarPlugin();
      },
      1000);

  }

  // Metodo que obtiene todos los comentarios del recurso video
  consultarComentarios(): void {
    this.commentsVersionVideoService.getCommentsVersionVideo(this.idRecurso).subscribe(comments => (this.annotations = comments));
  }

  // Metodo que regresa a la pantella anterior
  goBack(): void {
    this.location.back();
  }


  // Metodo para cerrar un comentario
  cerrarCommentarioModal(idComentario: any): void {
    this.idComentarioCerrar = idComentario;
    this.heading = 'Cerrar Comentario';
     /*this.body = '¿Desea cambiar de fase a ' + this.fases[this.detalle.fase.idConectate].nombre + '?';
    this.mensajeAdvertencia = this.seleccionarTexto(this.detalle.fase.idConectate.toString());*/
    $(this.modal.nativeElement).modal('show');
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.mensaje = null;
    location.reload();
    console.log('message');
  }

  // Metodo para cerrar un comentario
  cerrarCommentario(): void {
    console.log( 'Cerrar comentario: ' + this.idComentarioCerrar );
    console.log( 'Contenido comentario cierre: ' + this.contenidoComentarioCerrar );
    this.commentsVersionVideoService.cerrarComentarioVideo(this.idRecurso, this.idComentarioCerrar, this.contenidoComentarioCerrar);
    setTimeout(() => {
                this.consultarComentarios();
            }, 2500);
    this.cdRef.detectChanges();
  }

  public onChangeComentario( { editor }: ChangeEvent ) {
        this.contenidoComentarioCerrar = editor.getData();
  }


}
