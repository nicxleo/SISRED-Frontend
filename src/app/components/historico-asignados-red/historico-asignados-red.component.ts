import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-historico-asignados-red',
  templateUrl: './historico-asignados-red.component.html',
  styleUrls: ['./historico-asignados-red.component.css']
})
export class HistoricoAsignadosRedComponent implements OnInit {

  @Input() red;

  @Output() private closeModal = new EventEmitter<boolean>();

  private asignados = [];

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.closeModal.emit(true);
  }

}
