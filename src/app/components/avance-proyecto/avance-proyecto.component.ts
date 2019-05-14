import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avance-proyecto',
  templateUrl: './avance-proyecto.component.html',
  styleUrls: ['./avance-proyecto.component.css']
})
export class AvanceProyectoComponent implements OnInit {

  private reds = [
    {
      id: 2,
      nombre: 'RED_MISO_2',
      fechaInicio: '2019-04-15',
      fechaCierre: '2019-05-02'
    },
    {
      id: 3,
      nombre: 'RED_MISO_3',
      fechaInicio: '2019-05-02',
      fechaCierre: '2019-05-11'
    }
  ];
  public selectedRed = null;
  private modal = null;

  constructor() { }

  ngOnInit() {
  }

  selectRed(red, modal) {
    this.selectedRed = red;
    this.modal = modal;
    this.modal.show();
  }

  closeModal(close) {
    this.modal.hide();
  }

}
