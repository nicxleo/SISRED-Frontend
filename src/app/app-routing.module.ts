import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedsPorPersonaComponent } from './components/reds-por-persona/reds-por-persona.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRedComponent } from './components/add-red/add-red.component';
import { AgregarRecursoComponent } from './components/agregar-recurso/agregar-recurso.component';
import { DetalleRecursoComponent } from './components/detalle-recurso/detalle-recurso.component';
import { DetalleREDComponent } from './components/detalle-red/detalle-red.component';
import { ProyectosRedComponent } from './components/proyectos-red/proyectos-red.component';
import { RedRecursosDetalleComponent } from './components/red-recursos-detalle/red-recursos-detalle.component';
import { RedRecursosComponent } from './components/red-recursos/red-recursos.component';
import { RedAsignadosComponent } from './components/red/asignaciones/red-asignados.component';
import { RedsRelacionadosComponent } from './components/reds-relacionados/reds-relacionados.component';
import { VerAvanceRedComponent } from './components/ver-avance-red/ver-avance-red.component';
import {VerVersionRedComponent} from './components/ver-version-red/ver-version-red.component';
import { VersionRedRevisionComponent } from './components/version-red-revision/version-red-revision.component';
import { ComentarImagenComponent } from './components/comentar-imagen/comentar-imagen.component';
import { RedCrearVersionComponent } from './components/red-crear-version/red-crear-version.component';
import { BuscarRedComponent } from './components/buscar-red/buscar-red.component';

const routes: Routes = [
  { path: '', component: RedAsignadosComponent },
  { path: 'red/:idRed/proyecto/agregar', component: AddRedComponent },
  { path: 'red/asignados/:idUsuario', component: RedAsignadosComponent },
  { path: 'asignaciones', component: RedsPorPersonaComponent },
  { path: 'red/:idRed/detalle', component: DetalleREDComponent },
  { path: 'red/:idRed/proyectos', component: ProyectosRedComponent },
  {
    path: 'redrel/:idProyectoC',
    component: RedsRelacionadosComponent
  },
  { path: 'reds/:idUsuario', component: RedAsignadosComponent },
  { path: 'red/version/:idVersion/archivo/:idRecurso/comentar', component: ComentarImagenComponent },
  { path: 'buscarRed', component: BuscarRedComponent },
  {
    path: 'red/:idRed/version/:version',
    component: VersionRedRevisionComponent
  },
  { path: 'red/:idRed/proyectos', component: ProyectosRedComponent },
  {
    path: 'red/:id/recursos',
    component: RedRecursosComponent
  },
  {
    path: 'red/:id/recursos/:idrecurso',
    component: RedRecursosDetalleComponent
  }, 
  {
    path: 'red/:idRed/relacionados',
    component: RedsRelacionadosComponent
  },
  {
    path: 'red/:idRed/recursos/agregar',
    component: AgregarRecursoComponent
  },
  // {
  //   path: 'red/:id/recursos/:idrecurso',
  //   component: RedRecursosDetalleComponent
  // },
  {
    path: 'recurso/detalle/:id',
    component: DetalleRecursoComponent
  },
  { path: 'red/version/:id', component: VerVersionRedComponent },
  {
    path: 'reds/:id/avance',
    component: VerAvanceRedComponent
  },
  { path: 'crearVersion/:idRed', component: RedCrearVersionComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
