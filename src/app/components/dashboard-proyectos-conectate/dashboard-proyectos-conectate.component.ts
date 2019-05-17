import { Component, OnInit } from '@angular/core';
import { DashboardProyectoConectateService } from 'src/app/services/dashboard-proyecto-conectate/dashboard-proyecto-conectate.service';

@Component({
  selector: 'app-dashboard-proyectos-conectate',
  templateUrl: './dashboard-proyectos-conectate.component.html',
  styleUrls: ['./dashboard-proyectos-conectate.component.css']
})
export class DashboardProyectosConectateComponent implements OnInit {
  public loading = true;

  public proyectos = [];

  public pagina = 1;

  public paginaSize = 10;

  constructor(
    private dashboardProyectosConectateService: DashboardProyectoConectateService
  ) {}

  ngOnInit() {
    // Invoca al servicio que obtiene los proyectos conectate
    this.dashboardProyectosConectateService
      .obtenerMetricasProyectosConectate()
      .then((data: any) => {
        this.proyectos = data;
        this.loading = false;
      })
      .catch(err => {
        alert('Se produjó un error obteniendo los proyectos');
        this.loading = false;
      });
  }
}
