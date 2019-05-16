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

  constructor(
    private dashboardProyectosConectateService: DashboardProyectoConectateService
  ) {}

  ngOnInit() {
    this.dashboardProyectosConectateService
      .obtenerMetricasProyectosConectate()
      .then((data: any) => {
        this.proyectos = data;
        console.log(this.proyectos);

        this.loading = false;
      })
      .catch(err => {
        alert('Se produjó un error obteniendo los proyectos');
        this.loading = false;
      });
  }
}
