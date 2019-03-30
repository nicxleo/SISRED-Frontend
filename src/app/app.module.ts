import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SubirREDComponent } from './subir-red/subir-red.component';
import { RedsPorPersonaComponent } from './reds-por-persona/reds-por-persona.component';
import { AvanceProyectoConectateComponent } from './avance-proyecto-conectate/avance-proyecto-conectate.component';


@NgModule({
  declarations: [
    AppComponent,
    SubirREDComponent,
    RedsPorPersonaComponent,
    AvanceProyectoConectateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
