import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
=======
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
import { AddRedComponent } from './components/add-red/add-red.component';
import { AppRoutingModule } from './app-routing.module';
import { RedAsignadosComponent } from './components/red/asignaciones/red-asignados.component';
import { DetalleREDComponent } from './components/detalle-red/detalle-red.component';
import { ProyectosRedComponent } from './components/proyectos-red/proyectos-red.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListCommentsComponent } from './components/list-comments/list-comments.component';
@NgModule({
  declarations: [
    AppComponent,
    AddRedComponent,
<<<<<<< HEAD
    AddCommentsComponent,
    RedAsignadosComponent,
    DetalleREDComponent,
    ProyectosRedComponent,
    AddCommentsComponent,
    ListCommentsComponent

=======
    RedAsignadosComponent,
    DetalleREDComponent,
    ProyectosRedComponent
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
