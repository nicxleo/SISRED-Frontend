import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import * as $ from "jquery";
import * as Popper from "popper.js/dist/umd/popper.js";
import { ComentarioHijoPdfModel } from "src/app/services/comentario/comentario-pdf-hijo.model";
import { ComentarioPdfModel } from "src/app/services/comentario/comentario-pdf.model";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as moment from "../../../assets/AdminLTE/bower_components/moment/moment";
import _date = moment.unitOfTime._date;
import { ComentarioMultimedia } from "../../services/comentario/comentario-multimedia.model";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.scss"]
})
export class PdfViewerComponent implements OnInit {
  @Input()
  comentariosPdf: ComentarioPdfModel[];

  @Output()
  comentarioPadre = new EventEmitter<Object>();

  @Output()
  CerrarComentario_Aceptar = new EventEmitter<Object>();

  @Output()
  comentarioHijo = new EventEmitter<Object>();

  @Input()
  Mensaje: string;

  public rutaArchivo: string;
  public Editor = ClassicEditor;
  public textComentarioHijo: string;
  public seleccionado: ComentarioPdfModel;
  public coomentCierre: ComentarioPdfModel;
  myRadio: string;
  public MensajeModal: string;
  public loadData = false;
  public indiceCerrarComentario = 0;
  public CantidadAbiertos: number;
  public CantidadCerrados: number;
  public comentario: string = "";
  areaInfo: AreaInfo[] = [];

  @ViewChild("pdfContainer") private pdfContainer: ElementRef;
//Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Init del componente.
  ngOnInit() {
    this.loadData = false;
    var x = 1;
    setTimeout(() => {
      this.calcularTotales();
      this.comentariosPdf.forEach(data => {
        if (data.coordenadas.x1 != 0) {
          this.areaInfo.push({
            rectangleId: "rectangle-" + x,
            pageNumber: x,
            rect: {
              x1: Number(data.coordenadas.x1),
              y1: Number(data.coordenadas.y1),
              x2: Number(data.coordenadas.x2),
              y2: Number(data.coordenadas.y2),
              width: Number(data.width),
              height: Number(data.height)
            },
            comment: data.contenido,
            commentsChildren: data.comentariosHijos,
            isDelete: false,
            text: ""
          });
        }
        x++;
        this.rutaArchivo = this.comentariosPdf[0].rutaArchivo;
        this.loadData = true;
      });
    }, 2000);
  }

  title = "ng-pdf-highlighter";
  comment: string;

  rect: Rectangle = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
  lastMousePosition: Position = { x: 0, y: 0 };
  canvasPosition: Position = { x: 0, y: 0 };
  mousePosition: Position = { x: 0, y: 0 };
  mouseDownFlag: boolean = false;

  pagePosition: Position = { x: 0, y: 0 };

  cnv;
  pdfBody;
  ctx;
  element = null;
  dataPageNumber: number;

  constructor() {}

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Evento del Mouse para dibujar el área de entrada de texto
  mouseEvent(event) {
    if (!this.showPopup) {
      if (event.type === "mousemove") {
        this.mousePosition = {
          x: event.clientX - this.pagePosition.x,
          y: event.clientY - this.pagePosition.y
        };

        if (this.mouseDownFlag) {
          let width = this.mousePosition.x - this.lastMousePosition.x;
          let height = this.mousePosition.y - this.lastMousePosition.y;
          this.rect = {
            x1: this.lastMousePosition.x,
            y1: this.lastMousePosition.y,
            x2: this.mousePosition.x,
            y2: this.mousePosition.y,
            width: width,
            height: height
          };

          if (this.element != null) {
            this.element.style.width = width + "px";
            this.element.style.height = height + "px";
            if (this.rect.width > 0 && this.rect.height > 0) {
              document
                .getElementsByClassName("to-draw-rectangle")
                [this.dataPageNumber - 1].appendChild(this.element);
            }
          }
        }
      }

      if (event.type === "mousedown") {
        this.mouseDownFlag = true;

        let eventPath = event.path.find(p => p.className == "page");
        if (typeof eventPath !== "undefined") {
          this.dataPageNumber = parseInt(
            eventPath.getAttribute("data-page-number")
          ); // get id of page

          let toDrawRectangle = document.getElementsByClassName(
            "to-draw-rectangle"
          );
          let pageOffset = toDrawRectangle[
            this.dataPageNumber - 1
          ].getBoundingClientRect();
          this.pagePosition = {
            x: pageOffset.left,
            y: pageOffset.top
          };

          this.lastMousePosition = {
            x: event.clientX - this.pagePosition.x,
            y: event.clientY - this.pagePosition.y
          };

          let rectId = document.getElementsByClassName("rectangle").length + 1;

          this.element = document.createElement("div");
          this.element.className = "rectangle";
          this.element.id = "rectangle-" + rectId;
          this.element.style.position = "absolute";
          this.element.style.border = "2px solid #0084FF";
          this.element.style.borderRadius = "3px";
          this.element.style.left = this.lastMousePosition.x + "px";
          this.element.style.top = this.lastMousePosition.y + "px";
        }
      }

      if (event.type === "mouseup") {
        this.mouseDownFlag = false;
        if (this.rect.height > 0 && this.rect.width > 0) {
          let popper = document.querySelector(".js-popper");
          new Popper(this.element, popper, {
            placement: "top-end"
          });
          this.showPopup = true;
        }
      }
    }
  }

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Render de la pagina.
  pageRendereds(e) {
  }
  // added new div when pages rendered
  indexOfPage: number = 1;
  pageRendered(event) {
    let elem = document.createElement("div");
    elem.className = "to-draw-rectangle";
    elem.style.position = "absolute";
    elem.style.left = 0 + "px";
    elem.style.top = 0 + "px";
    elem.style.right = 0 + "px";
    elem.style.bottom = 0 + "px";
    elem.style.cursor = "crosshair";
    // elem.style.background = 'red';
    // elem.style.opacity = '0.4';
    event.source.div.appendChild(elem);

    $(".textLayer").addClass("disable-textLayer");

    let rectElem = this.areaInfo.find(f => f.pageNumber === this.indexOfPage);
    if (typeof rectElem !== "undefined") {
      let rectId = document.getElementsByClassName("rectangle").length + 1;
      let rect = document.createElement("div");
      rect.className = "rectangle";
      rect.id = "rectangle-" + rectId;
      rect.style.position = "absolute";
      rect.style.border = "2px solid #0084FF";
      rect.style.borderRadius = "3px";
      rect.style.left = rectElem.rect.x1 + "px";
      rect.style.top = rectElem.rect.y1 + "px";
      rect.style.width = rectElem.rect.width + "px";
      rect.style.height = rectElem.rect.height + "px";
      //get to-draw-rectangle div and add rectangle
      event.source.div.children[2].appendChild(rect);
    }
    this.indexOfPage++;
  }

  showPopup: boolean = false;
  getStyle() {
    if (this.showPopup) {
      return "block";
    } else {
      return "none";
    }
  }
//Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Guardar comentario padre. una vez se presione el boton agregar.
  save() {
    let areaInfo = {
      rectangleId: this.element.id,
      pageNumber: this.dataPageNumber,
      rect: this.rect,
      isDelete: false,
      comment: this.comment,
      commentsChildren: [],
      text: "",
      escierre: false,
      resuelto: false,
      cerrado: false,
      UsuarioComentario: "",
      fechaCreacion: new Date()
    };
    this.areaInfo.push(areaInfo);
    this.showPopup = false;
    this.rect = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
    this.comment = "";
    this.comentarioPadre.emit({
      coordenadas: areaInfo.rect,
      comentario: areaInfo.comment
    });
    let idComentario = localStorage.getItem("idComentario");
    let coord = new ComentarioMultimedia();
    coord.id = Number(localStorage.getItem("coordenadas"));
    coord.x1 = areaInfo.rect.x1;
    coord.y1 = areaInfo.rect.y1;
    coord.x2 = areaInfo.rect.x2;
    coord.y2 = areaInfo.rect.y2;
    this.comentariosPdf.push({
      id: idComentario,
      contenido: this.comment,
      coordenadas: coord,
      fechaCreacion: areaInfo.fechaCreacion,
      version: "",
      idUsuario: "",
      width: "",
      height: "",
      rutaArchivo: "",
      comentariosHijos: null,
      esCierre: false,
      cerrado: false,
      resuelto: false,
      UsuarioComentario: ""
    });

    this.calcularTotales();
    // logica para agregar comentario
  }

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Agregar un comentario hijo.
  addComment(posicionPadre: number) {
    this.comentarioHijo.emit({
      idComentarioPadre: this.comentariosPdf[posicionPadre].coordenadas.id,
      comentario: this.areaInfo[posicionPadre].text
    });
    this.areaInfo[posicionPadre].commentsChildren.push({
      id: "",
      contenido: this.areaInfo[posicionPadre].text,
      text: "",
      fechaCreacion: new Date(),
      version: "",
      idUsuario: "1",
      esCierre: false,
      UsuarioComentario: ""
    });
    this.areaInfo[posicionPadre].text = "";
  }

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Evento del cancelar sobre el rectangulo que permite agregar comentarios padres
  cancel(event) {
    let rectId = this.element.getAttribute("id");
    $("#" + rectId).remove();
    this.showPopup = false;
    this.rect = { x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
  }

  listRectangleId: string = "";

  //Autor: Francisco Perneth
  //Fecha: 2019-05-15
  //Descripcion: Evento Click sobre elemento de la lista, permite almacenar el comentario seleccionado
  public seleccionarComentarioCerrado(i: number) {
    this.indiceCerrarComentario = i;
    this.seleccionado = this.comentariosPdf[i];
  }
//Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Permite ubicar un comentario dentro del pdf. este evento se lanza en el boton ver comentario.
  moveTo(list: AreaInfo) {
    if (this.listRectangleId != "") {
      if (document.getElementById(this.listRectangleId)) {
        document.getElementById(this.listRectangleId).style.background =
          "transparent";
        document.getElementById(this.listRectangleId).style.opacity = "1";
      }
    }
    if (this.listRectangleId !== list.rectangleId) {
      document
        .getElementById(list.rectangleId)
        .scrollIntoView({ block: "start", behavior: "smooth" });
      document.getElementById(list.rectangleId).style.background = "red";
      document.getElementById(list.rectangleId).style.opacity = "0.4";
      this.listRectangleId = list.rectangleId;
    }
  }

  seleccionarComentario(comentario: ComentarioPdfModel) {
    this.seleccionado = comentario;
  }

  onComentarioChange(comentario) {
    this.comentario = comentario.editor.getData();
  }
   calcularTotales(){
    this.CantidadAbiertos = this.comentariosPdf.filter(
        x => x.cerrado === false && x.coordenadas.id != 0
      ).length;
      this.CantidadCerrados = this.comentariosPdf.filter(
        x => x.cerrado === true && x.coordenadas.id != 0
      ).length;
   }
  CerrarComentario() {
    this.coomentCierre = this.seleccionado;
    this.seleccionado.cerrado = true;
    if (this.myRadio == "resuelto") {
      this.coomentCierre.resuelto = true;
    } else {
      this.coomentCierre.resuelto = false;
    }
    this.coomentCierre.cerrado = true;
    console.log("coomentario cierre");
    this.coomentCierre.coordenadas = this.comentariosPdf[
      this.indiceCerrarComentario
    ].coordenadas;
    this.comentariosPdf[
      this.indiceCerrarComentario
    ].cerrado=true;
    this.CerrarComentario_Aceptar.emit({
      seleccionado: this.coomentCierre,
      comentario: this.comentario
    });
    this.addCommentCierre(this.indiceCerrarComentario, this.comentario);
    this.MensajeModal = "Operacion realizada con exito";
    this.calcularTotales();
  }

  public getItemComentario(i: number) {
    return this.comentariosPdf[i];
  }

  addCommentCierre(posicionPadre: number, Comment) {
    this.areaInfo[posicionPadre].commentsChildren.push({
      id: "",
      contenido: Comment,
      text: "",
      fechaCreacion: new Date(),
      version: "",
      idUsuario: "1",
      esCierre: false,
      UsuarioComentario: "User actual"
    });
  }
}

interface Position {
  x: number;
  y: number;
}

interface Rectangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

interface AreaInfo {
  rectangleId: string;
  pageNumber: number;
  rect: Rectangle;
  isDelete?: boolean;
  comment?: string;
  commentsChildren?: ComentarioHijoPdfModel[];
  text?: string;
}
