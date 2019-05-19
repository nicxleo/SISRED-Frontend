import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RED } from './Models/red';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvanceRedRestClientService } from 'src/app/services/red/ver-avance-red/advance-red-rest-client.service';
import { Fase } from './Models/fase';

@Component({
  selector: 'app-ver-avance-red',
  templateUrl: './ver-avance-red.component.html',
  styleUrls: ['./ver-avance-red.component.css']
})

/**
 * @param red es el objeto red especificado en la carpeta models
 * @param advanceRedForm formulario con los datos del red
 * @param idRed es el id del red para manipularlo
 */
export class VerAvanceRedComponent implements OnInit {
  public red: RED;
  public fases: Array<Fase>;
  public advanceRedForm: FormGroup;
  private idRed: number;

  constructor(
    private route: ActivatedRoute,
    private advanceRedRestClientService: AdvanceRedRestClientService,
    private _route: Router
  ) {
    this.route.params.subscribe(param => {
      this.idRed = Number(param['idRed']);
    });
  }

  ngOnInit(): void {
    this.loadForm();
    this.getAdvanceRed(this.idRed);
  }

  /**
   * Inicializa las variables del formulario
   */
  loadForm(): void {
    this.advanceRedForm = new FormGroup({
      nombre: new FormControl(''),
      getProyecto: new FormControl(''),
      getFase: new FormControl('')
    });
  }

  /**
   * Metodo para obtener el objeto red y sus fases
   * @param id es el id del red a buscar
   */
  public getAdvanceRed(id: number): void {
    this.advanceRedRestClientService
      .getAdvanceRedById(id)
      .subscribe(response => {
        this.red = response;
        this.fases = this.red.fases[0];
      });
  }
}
