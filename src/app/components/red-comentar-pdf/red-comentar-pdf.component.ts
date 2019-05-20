import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComentarioPdfModel } from "src/app/services/comentario/comentario-pdf.model";
import { ComentarRestClientService } from "src/app/services/red/comentar-red/comentar-rest-client.service";

@Component({
  selector: "app-red-comentar-pdf",
  templateUrl: "./red-comentar-pdf.component.html",
  styleUrls: ["./red-comentar-pdf.component.css"],
  providers: [ComentarRestClientService]
})

export class RedComentarPdfComponent implements OnInit {
  public comentariosPdf: ComentarioPdfModel[];

  public test = "test";
  public idRed: string;
//Variables FJPG
  idVersion: number;
  idRecurso: number;

  public myRadio: boolean;
  public Mensaje: string;

  public  CantidadAbiertos: number;
  public  CantidadCerrados: number;


  constructor(
    private route: ActivatedRoute,
    private comentarRestClientService: ComentarRestClientService
  ) {
      this.idRecurso=0;
      this.idVersion=0;

  }

  ngOnInit() {
    this.Mensaje = "";
    this.getComentarios();
  }
  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Obtener comentarios. consumo de servicios que devuelven lista de comentarios.
getComentarios() {
    this.route.paramMap.subscribe(params => {
      this.idRed = params.get("id");
      this.comentarRestClientService
        .getComentariosByIdRed(params.get("id"))
        .subscribe(data => {
          console.log(data);
          this.comentariosPdf = data;
        });
    });
  }

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Guardar un comentario padre.
  guardarComentarioPadre($event): void {
    console.log("Comentario padre");

    this.comentarRestClientService
      .postComentariosByIdRed($event, Number(this.idRed))
      .subscribe(response => {
        debugger;
        localStorage.setItem("idComentario", response.id);
        localStorage.setItem("coordenadas", response.comentarioMultimedia.id);
        console.log(response);
      });
  }
//Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Guardar un comentario HIjo.
  guardarComentarioHijo($event): void {
    this.comentarRestClientService
      .postComentarioHijoByIdRed($event, this.idRed)
      .subscribe(response => {
        console.log(response);
      });
  }

  //Autor: Cristian Sepulveda
  //Fecha: 2019-05-15
  //Descripcion: Cerrar comentarios.
  CerrarComentario_Aceptar(Obj: any) {
    Obj.seleccionado.cerrado = true;
    this.comentarRestClientService
      .ComentarioPDF_put(Obj.seleccionado)
      .subscribe(
        response => {
          debugger;
          this.Mensaje = "operación realizada con exito.";
        },
        error => {
          debugger;
          console.log(error);
          this.Mensaje =
            "operación no pudo completarse con exito. favor comunicarse con el administrador";
        }
      );
    this.comentarRestClientService
      .ComentarioPDF_post(Obj.seleccionado, Obj.comentario)
      .subscribe(
        response => {
          debugger;
          this.Mensaje = "operación realizada con exito.";
        },
        error => {
          debugger;
          console.log(error);
          this.Mensaje =
            "operación no pudo completarse con exito. favor comunicarse con el administrador";
        }
      );
  }

}
