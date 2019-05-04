import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";
import {RedAsignadosService} from "../../services/red/red-asignados.service";
import {RedAsignado} from "../../services/red/RedAsignado";

declare function setup(): any;
declare function setupTable(): any;

@Component({
  selector: 'app-reds-asignados-revision',
  templateUrl: './reds-asignados-revision.component.html',
  styleUrls: ['./reds-asignados-revision.component.css']
})
export class RedsAsignadosRevisionComponent implements OnInit {

  reds: RedAsignado[] = null;
  idUsuario: number;

 constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private redAsignadosService: RedAsignadosService) {

  }

  ngOnInit() {
    setup();  
    this.idUsuario = this.activatedRoute.snapshot.params.idUsuario; //TODO Temporal.
    this.getREDsAsignados();
  }

  getREDsAsignados(): void {
    if(this.idUsuario == null) this.idUsuario = 1;
    this.redAsignadosService.getREDs(this.idUsuario).subscribe(redsAsignado => this.reds = redsAsignado, error=>console.log("error: "+error), ()=>setTimeout(function() { setupTable() }, 1000));
  }



}
