import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRedComponent } from './components/add-red/add-red.component';
<<<<<<< HEAD
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
=======
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
import { RedAsignadosComponent } from './components/red/asignaciones/red-asignados.component';
import { HttpClientModule } from '@angular/common/http';
import {DetalleREDComponent} from './components/detalle-red/detalle-red.component';
import {ProyectosRedComponent} from './components/proyectos-red/proyectos-red.component';
<<<<<<< HEAD
import {ListCommentsComponent} from './components/list-comments/list-comments.component';
=======
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a

const routes: Routes = [
  {path: '', component: RedAsignadosComponent},
  {path: 'red/:idRed/proyecto/agregar', component: AddRedComponent},
<<<<<<< HEAD
  {path: 'red/:idRed/comentario/agregar', component: AddCommentsComponent},
  {path: 'red/asignados/:idUsuario', component: RedAsignadosComponent},
  {path: 'red/:idRed/detalle', component: DetalleREDComponent},
  {path: 'red/:idRed/proyectos', component: ProyectosRedComponent},
  {path: 'get_comentarios/1', component: ListCommentsComponent}
=======
  {path: 'red/asignados/:idUsuario', component: RedAsignadosComponent},
  {path: 'red/:idRed/detalle', component: DetalleREDComponent},
  {path: 'red/:idRed/proyectos', component: ProyectosRedComponent}
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
