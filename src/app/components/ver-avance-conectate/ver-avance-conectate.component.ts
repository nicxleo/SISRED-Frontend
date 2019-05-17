import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VerAvanceConectateService} from '../../services/proyectoConectate/ver-avance-conectate/ver-avance-conectate.service';
import {Avance} from '../../services/proyectoConectate/ver-avance-conectate/avance.model';

declare function setup(): any;

@Component({
  selector: 'app-ver-avance-conectate',
  templateUrl: './ver-avance-conectate.component.html',
  styleUrls: ['./ver-avance-conectate.component.css']
})
export class VerAvanceConectateComponent implements OnInit {

  id: number;
  date: Date = new Date();
  objAvance: Avance = new Avance();

  constructor(private route: ActivatedRoute, private verAvanceConectateService: VerAvanceConectateService) {
  }

  ngOnInit() {
    setup();
    this.id = this.route.snapshot.params.id;
    this.getAvance();
  }

  getAvance(): void {
    this.verAvanceConectateService.getAvance(this.id)
      .then(pAvance => {
        this.objAvance = pAvance;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getListaAsigandos(id): void {
    const htmlAsigandos = document.getElementById('asignados-' + id).innerHTML;
    document.getElementById('asignadosContent').innerHTML = htmlAsigandos;
  }
}
