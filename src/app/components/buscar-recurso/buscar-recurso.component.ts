import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import { Recurso } from '../../services/recurso/recurso';
import { BuscarRecursoService } from '../../services/recurso/buscar-recurso.service';

declare function setup(): any;

@Component({
  selector: 'app-buscar-recurso',
  templateUrl: './buscar-recurso.component.html',
  styleUrls: ['./buscar-recurso.component.css']
})
export class BuscarRecursoComponent implements OnInit {

  public buscarRecursoForm: FormGroup;

  recursos: Recurso[] = [];
  recursosSinRepetir: Recurso[] = [];
  pagina: number = 1;
  paginaSize: number = 5;
  cargando: boolean = false;
  mostrarFiltroAvanzado: boolean = false;
  mostrarFiltroGeneral: boolean = true;


  constructor(private buscarRecursoService: BuscarRecursoService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    setup();
    this.buscarRecursoForm = new FormGroup({
      texto: new FormControl(),
      nombre: new FormControl(),
      fechaDesde: new FormControl(),
      fechaHasta: new FormControl(),
      tag: new FormControl()
    });
  }

  buscarRecurso() {
    this.recursos = [{
      id: '1',
      nombre: 'mi red',
      archivo: 'mi red',
      thumbnail: 'esta es una descripción',
      fecha_creacion: '2019-02-12',
      fecha_ultima_modificacion: '2019-04-22',
      tipo: 'string',
      descripcion: '1',
      metadata: '3',
      autor: 'string',
      usuario_ultima_modificacion: '1',
    },];
    console.log({
      fecha_creacion: this.buscarRecursoForm.get('fechaDesde').value,
      nombre: this.buscarRecursoForm.get('nombre').value,
    });
    this.cargando = true;
    this.spinner.show()
    this.buscarRecursoService.buscarRecursos(this.buscarRecursoForm.get('texto').value, this.buscarRecursoForm.get('nombre').value, this.formatFecha(this.buscarRecursoForm.get('fechaDesde').value),
      this.formatFecha(this.buscarRecursoForm.get('fechaHasta').value), this.buscarRecursoForm.get('tag').value)
      .then(recursos => {
        console.log(recursos);
        this.spinner.hide()
        this.recursos = recursos;
        this.eliminarRepetidos();
      })
      .catch(err => {
        this.spinner.hide();
        console.log(err);
      });
  }

  formatFecha(fecha) {
    let res = null;
    if (fecha !== null) {
      let year = fecha.year;
      let month = fecha.month<10 ? `0${fecha.month}` : fecha.month;
      let day = fecha.day<10 ? `0${fecha.day}` : fecha.day;
      res = `${year}-${month}-${day}`;
    }
    return res;
  }

  eliminarRepetidos() {
    this.recursosSinRepetir = [];
    for(let recurso of this.recursos) {
      if(this.recursosSinRepetir.filter(r => r.id === recurso.id).length === 0) {
        this.recursosSinRepetir.push(recurso);
      }
    }
  }
  
  activarFiltros() {
    if (this.mostrarFiltroAvanzado) {
      this.mostrarFiltroAvanzado = false;
      this.mostrarFiltroGeneral = true;
      this.buscarRecursoForm.get('nombre').setValue('');
      this.buscarRecursoForm.get('fechaDesde').setValue('');
      this.buscarRecursoForm.get('fechaHasta').setValue('');
      this.buscarRecursoForm.get('tag').setValue('');
    } else {
      this.mostrarFiltroAvanzado = true;
      this.mostrarFiltroGeneral = false;
      this.buscarRecursoForm.get('texto').setValue('');
    }
  }

}
