import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddCommentsComponent } from './components/add-comments/add-comments.component';
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
    AddCommentsComponent,
    RedAsignadosComponent,
    DetalleREDComponent,
    ProyectosRedComponent,
    AddCommentsComponent,
    ListCommentsComponent

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
